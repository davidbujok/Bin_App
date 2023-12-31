import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Text,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {IDate} from './styles/interfaces';
import Geocoder from 'react-native-geocoding';
import {heroText, navbar, search, styles} from './styles/stylesSheet';
import {api} from './api-keys/api-keys.js';
import HomeContainer from './Containers/HomeContainer';
import SearchingContainer from './Containers/SearchingContainer';
import RemindersScreen from './Components/RemindersScreen';
import BaseContainer from './Containers/BaseContainer';
import Carousel from './Containers/SwipeableContainer';
import PushNotification from 'react-native-push-notification';
import PageType from './Helpers/PageType';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const [streets, setStreets] = useState<Array<String>>();
  const [dates, setDates] = useState<Array<IDate>>();
  const [input, setInput] = useState<string>();
  const [location, setLocation] = useState<GeoPosition | Boolean>(false);
  const [address, setAddress] = useState({});
  const [page, setPage] = useState<PageType>(PageType.Home);
  const [newFormat, setNewFormat] = useState<string | undefined>();
  const [streetName, setStreetName] = useState<string>();
  const [allStreetsJson, setAllStreetsJson] = useState<Object>({});
  const [calendarMeanings, setCalendarMeanings] = useState<Array<Object>>([]);
  const [modalRemindersVisible, setModalRemindersVisible] = useState(false);

  Geocoder.init(api);

  useEffect(() => {
    const allStreetsLoaded = require('./assets/all_data_file_without_none.json');
    setAllStreetsJson(allStreetsLoaded);
    const allCalendarMeaningsLoaded = require('./assets/days_of_first_pickup_january_2023.json');
    setCalendarMeanings(allCalendarMeaningsLoaded);
  }, []);

  useEffect(() => {
    if (
      Object.keys(allStreetsJson).length > 0 &&
      Object.keys(calendarMeanings).length > 0
    ) {
      loadPreviousStreetIfWeKnowIt();
    }
  }, [allStreetsJson, calendarMeanings]);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'Date-Notification',
        channelName: 'Date-Notification channel',
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }, []);

  useEffect(() => {
    if (location) {
      Geocoder.from(
        location['coords']['latitude'],
        location['coords']['longitude'],
      )
        .then(json => {
          let addressComponent = json.results;
          setAddress(addressComponent[0].formatted_address.valueOf());
          setNewFormat(
            addressComponent[0].formatted_address
              .valueOf()
              .split(' ', 3)
              .slice(1, 3)
              .join(' ')
              .toLowerCase()
              .replace(/,/g, ''),
          );
        })
        .catch(error => console.warn(error));
    }
  }, [location]);

  const loadPreviousStreetIfWeKnowIt = async () => {
    const fetchStreetFromBefore = async () => {
      const streetFromBefore = await getStreetFromBefore();
      handleFetchByStreet(streetFromBefore);
    };

    // call the function
    fetchStreetFromBefore()
      // make sure to catch any error
      .catch(console.error);
  };

  useEffect(() => {
    if (address != undefined && newFormat != undefined) {
      setInput(newFormat);
    }
  }, [address, newFormat]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted?', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }; // STOP GEOLOCATION

  const dateFromDay = (year, day) => {
    const startOfYear = new Date(year, 0); // initialize a date in `year-01-01`
    const dayInYear = new Date(startOfYear.setDate(day)); // add the number of days
    return dayInYear;
  };

  const iDateFromData = (
    january23Day,
    binType,
    binTypeIndex, //this can be done better?
    streetName = 'do we need this?',
    whichFortnight = 0,
  ) => {
    const dayOfYear = january23Day + 14 * whichFortnight;
    const dateObject = dateFromDay(2023, dayOfYear);
    const idOfPinPickup = dateObject.getTime(); //epoch time is the unique id
    const dateFormatted = dateObject.toISOString();
    // TODO: change to binTypes['packaging', 'glass'] for simpler parsing in pager
    const dateToReturn: IDate = {
      id: idOfPinPickup,
      binType: binType,
      date: dateFormatted,
      name: streetName,
      dateObject: dateObject,
    };
    return dateToReturn;
    //   {
    //     id: 2222,
    //     binType: 'packaging',
    //     date: '23-12-23',
    //     name: 'willowbrae rd',
    //   }
  };

  const handleFetchByStreet = (streetName: string) => {
    // TODO: here add garden waste
    //eg tuesday-1
    const AllCalendarIds = allStreetsJson[streetName];
    //    {"food_id": "Thursday", "garden_id": "wednesday-1", "recycling_id": "thursday-1"}
    //  for now let's just grab recycling
    const recyclingCalendarId = AllCalendarIds.recycling_id;
    // need this to somehow provide a date for food each 7 days instead of 14
    const foodCalendarId = AllCalendarIds.food_id;
    const gardenCalendarId = AllCalendarIds.garden_id;
    let daysForThatStreet = calendarMeanings[recyclingCalendarId];
    //eg {"waste": "6", "recycling": "13","glass": "13"},
    if (foodCalendarId) {
      daysForThatStreet = {
        ...daysForThatStreet,
        ...calendarMeanings[foodCalendarId],
      };
    }
    //eg {"waste": "6", "recycling": "13","glass": "13","food":6},
    if (gardenCalendarId) {
      daysForThatStreet = {
        ...daysForThatStreet,
        garden: calendarMeanings[gardenCalendarId]['garden'],
      };
    }

    const iDatesByDay: {[key: string]: IDate} = {};
    const fortnight = 0; //in case we'll do the firtnighting here
    // ['waste', 'recycling', 'glass'] is Object.keys(daysForThatStreet)

    // TODO: once there is garden waste etc, add it here to firstDates
    if (daysForThatStreet) {
      Object.keys(daysForThatStreet).forEach((binType, binTypeIndex) => {
        const dayNumber = parseInt(daysForThatStreet[binType]);
        if (dayNumber) {
          const newIDate = iDateFromData(
            dayNumber,
            binType,
            binTypeIndex, //must be a better way. maybe create id here?
            streetName, //not needed?
            fortnight,
          );
          if (dayNumber in iDatesByDay) {
            console.log('new!', newIDate.binType, ' I DATE :', iDatesByDay);
            iDatesByDay[`${dayNumber}`].binType = `${
              iDatesByDay[`${dayNumber}`].binType
            } ${newIDate.binType}`;
          } else {
            iDatesByDay[`${dayNumber}`] = newIDate;
            console.log(iDatesByDay);
          }
        }
      });

      rememberStreetForLater(streetName);

      setDates(Object.values(iDatesByDay));
    }

    setPage(PageType.Results);
    // setAddress({});
    setLocation(false);
    setNewFormat(undefined);
    Keyboard.dismiss();
  }; // End of handleFetch By Street

  const rememberStreetForLater = async (streetName: string) => {
    try {
      await AsyncStorage.setItem('streetName', streetName);
    } catch (e) {
      // saving error
    }
  };

  const getStreetFromBefore = async () => {
    try {
      const value = await AsyncStorage.getItem('streetName');
      if (value !== null) {
        return value;
      } else {
        return '';
      }
    } catch (e) {
      return '';
      // error reading value
    }
  };

  useEffect(() => {
    if (input && input.length > 1 && allStreetsJson) {
      const justRelevantStreets = Object.keys(allStreetsJson).filter(
        street => street.includes(input.toLowerCase()),
        [],
      );
      //   console.log(justRelevantStreets.length);
      //   console.log(justRelevantStreets);
      //   console.log(Object.keys(allStreetsJson)[0] === 'abbey street');

      let tenRelevantStreets = justRelevantStreets.slice(0, 10);
      setStreets(tenRelevantStreets);
      setPage(PageType.Searching);
    } else {
      // console.log('no results for', input);
      setPage(PageType.Home);
    }
  }, [input, allStreetsJson]);

  const doNothing = () => {};

  const renderSwitch = (page: PageType) => {
    switch (page) {
      case PageType.Home:
        return <HomeContainer heroText={heroText} />;
      case PageType.Searching:
        return (
          <SearchingContainer
            streets={streets}
            handleFetchByStreet={handleFetchByStreet} //{handleFetchByStreet}
            setStreetName={setStreetName}
          />
        );
      case PageType.Results:
        return (
          <>
            <Carousel
              dates={dates}
              streetName={streetName}
              setModalRemindersVisible={setModalRemindersVisible}
            />
          </>
        );
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <BaseContainer
          setAddress={setAddress}
          setLocation={setLocation}
          setNewFormat={setNewFormat}
          navbar={navbar}
          search={search}
          setInput={setInput}
          input={input}
          getLocation={getLocation}
          renderSwitch={renderSwitch}
          setPage={setPage}
          page={page}
          setDates={setDates}
          dates={dates}
          address={address}
          modalRemindersVisible={modalRemindersVisible}
          setModalRemindersVisible={setModalRemindersVisible}
        />
      </SafeAreaView>
    </>
  );
}

export default App;
