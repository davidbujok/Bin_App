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
import {heroText, navbar, search} from './styles/stylesSheet';
import {api} from './api-keys/api-keys.json';
import HomeContainer from './containers/HomeContainer';
import SearchingContainer from './containers/SearchingContainer';
import BaseContainer from './containers/BaseContainer';
import Carousel from './containers/SwipeableContainer';
import PushNotification from 'react-native-push-notification';

function App(): JSX.Element {
  const [streets, setStreets] = useState<Array<String>>();
  const [dates, setDates] = useState<Array<IDate>>();
  const [input, setInput] = useState<string>();
  const [location, setLocation] = useState<GeoPosition | Boolean>(false);
  const [address, setAddress] = useState({});
  const [page, setPage] = useState<number>(1);
  const [newFormat, setNewFormat] = useState<string | undefined>();
  const [streetName, setStreetName] = useState<string>();
  const [allStreetsJson, setAllStreetsJson] = useState<Object>({});
  const [calendarMeanings, setCalendarMeanings] = useState<Array<Object>>([]);

  Geocoder.init(api);

  useEffect(() => {
    const allStreetsLoaded = require('./assets/merged_with_recycling.json');
    setAllStreetsJson(allStreetsLoaded);
  }, []);

  useEffect(() => {
    const allCalendarMeaningsLoaded = require('./assets/days_of_first_pickup_january_2023.json');
    setCalendarMeanings(allCalendarMeaningsLoaded);
  }, []);

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

  useEffect(() => {
    if (address != undefined && newFormat != undefined) {
      //   console.log('address');
      //   console.log(address);
      //   console.log(newFormat);
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
    const idOfPinPickup = dayOfYear + 1000 * binTypeIndex;
    const dateFormatted = dateFromDay(2023, dayOfYear).toISOString();
    // TODO: change to binTypes['packaging', 'glass'] for simpler parsing in pager
    const dateToReturn: IDate = {
      id: idOfPinPickup,
      binType: binType,
      date: dateFormatted,
      name: streetName,
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
    const recyclingCalendarIds = allStreetsJson[streetName];
    //    {"food_id": "Thursday", "garden_id": "wednesday-1", "recycling_id": "thursday-1"}
    //  for now let's just grab recycling
    const recyclingCalendarId = recyclingCalendarIds.recycling_id;
    // console.log('streetName');
    // console.log(streetName);
    // console.log(recyclingCalendarIds);
    //  {"food_id": "Thursday", "garden_id": "wednesday-2", "recycling_id": "thursday-1"}
    // console.log(recyclingCalendarId);
    // "thursday-1"
    const daysForThatStreet = calendarMeanings[recyclingCalendarId];
    // console.log('daysForThatStreet');
    //eg {"waste": "6", "recycling": "13","glass": "13"},
    console.log(daysForThatStreet);
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
            'banana stteet', //not needed?
            fortnight,
          );
          console.log('Object.keys(iDatesByDay) 1');
          console.log(binType, Object.keys(iDatesByDay));
          if (dayNumber in iDatesByDay) {
            console.log('new!', newIDate.binType, iDatesByDay);
            iDatesByDay[`${dayNumber}`].binType = `${
              iDatesByDay[`${dayNumber}`].binType
            } ${newIDate.binType}`;
          } else {
            iDatesByDay[`${dayNumber}`] = newIDate;
          }
          console.log('iDatesByDay');
          console.log(iDatesByDay);
          console.log('Object.keys(iDatesByDay) 2');
          console.log(binType, Object.keys(iDatesByDay));
        }
      });
      setDates(Object.values(iDatesByDay));
    }
    setPage(3);
    setAddress({});
    setLocation(false);
    setNewFormat(undefined);
    Keyboard.dismiss();
  }; // End of handleFetch By Street

  useEffect(() => {
    if (input && input.length > 1 && allStreetsJson) {
      const justRelevantStreets = Object.keys(allStreetsJson).filter(
        street => street.includes(input.toLowerCase()),
        [],
      );
      console.log(justRelevantStreets.length);
      console.log(justRelevantStreets);
      console.log(Object.keys(allStreetsJson)[0] === 'abbey street');

      setStreets(justRelevantStreets);
      setPage(2);
    } else {
      console.log('no results for', input);
      setPage(1);
    }
  }, [input, allStreetsJson]);

  const doNothing = () => {};

  const renderSwitch = (page: number) => {
    switch (page) {
      case 1:
        return <HomeContainer heroText={heroText} />;
      case 2:
        return (
          <SearchingContainer
            streets={streets}
            handleFetchByStreet={handleFetchByStreet} //{handleFetchByStreet}
            setStreetName={setStreetName}
          />
        );
      case 3:
        return (
          <>
            <Carousel dates={dates} streetName={streetName} />
          </>
        );
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Text>Banana 2</Text>
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
        />
      </SafeAreaView>
    </>
  );
}

export default App;
