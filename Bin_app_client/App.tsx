import React, {useEffect, useState} from 'react';
import {SafeAreaView, PermissionsAndroid, Keyboard} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {IStreet, IDate} from './styles/interfaces';
import Geocoder from 'react-native-geocoding';
import {heroText, navbar, search} from './styles/stylesSheet';
import {api} from './api-keys/api-keys';
import HomeContainer from './containers/HomeContainer';
import SearchingContainer from './containers/SearchingContainer';
import BaseContainer from './containers/BaseContainer';
import Carousel from './containers/SwipeableContainer';
import PushNotification from 'react-native-push-notification';


function App(): JSX.Element {
  const [streets, setStreets] = useState<Array<IStreet>>();
  const [dates, setDates] = useState<Array<IDate>>();
  const [input, setInput] = useState<string>();
  const [location, setLocation] = useState<GeoPosition | Boolean>(false);
  const [address, setAddress] = useState({});
  const [page, setPage] = useState<number>(1);
  const [newFormat, setNewFormat] = useState<string | undefined>();
  const [streetName, setStreetName] = useState<string>();

  Geocoder.init(api);



  useEffect(()=>{
    PushNotification.createChannel(
      {
        channelId: 'Date-Notification', 
        channelName: 'Date-Notification channel', 
        vibrate: true, 
      },
      (created) => 
      console.log(`createChannel returned '${created}'`) 
    ); 
  },[])

  
  useEffect(() => {
      if (location) {
      Geocoder.from( location['coords']['latitude'], location['coords']['longitude'])
      .then(json => {
          let addressComponent = json.results;
          setAddress(addressComponent[0].formatted_address.valueOf());
          setNewFormat(addressComponent[0].formatted_address.valueOf().split(" ", 3).slice(1,3).join(" ").toLowerCase().replace(/,/g, ''))
          })
      .catch(error => console.warn(error));
      }}, [location]);

  useEffect(()=> {
      if (address != undefined && newFormat != undefined) {
      console.log(address)
      console.log(newFormat)
      setInput(newFormat)
      }
    }, [address, newFormat])

  const requestLocationPermission = async () => {
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
      console.log('granted', granted);
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
  };   // STOP GEOLOCATION

  const handleFetchByStreet = (streetName: string) => {
    const date: Date = new Date();

    const getYear: number = date.getFullYear();
    let year: string = getYear.toString();

    let getMonth: number = date.getMonth() + 1;
    let month: string = '';

    let getDay: number = date.getDate();
    let day: string = '';

    if (getMonth < 10) {
      month = '0' + getMonth.toString();
    } else {
      month = getMonth.toString();
    }

    if (getDay < 10) {
      day = '0' + getDay.toString();
    } else {
      day = getDay.toString();
    }

    const dateInstance: string = year + month + day;

    fetch(
      `http://10.0.2.2:8080/collectionDates?street=${streetName}&date=${dateInstance}`,
    )
      .then(response => response.json())
      .then((data: Array<IDate>) => {
        for (let i = 0; i < data.length -1; i ++ ){
            if (data[i].date == data[i + 1].date) {
                data[i].binType += " " + data[i + 1].binType
                data.splice(i + 1, 1)
            }  
          }
        setDates(data);
      })
      .catch(error => {
        console.error(error);
      });
    setPage(3);
    setAddress({})
    setLocation(false)
    setNewFormat(undefined)
    Keyboard.dismiss()
  }; // End of handleFetch By Street

  useEffect(() => {
    if (input && input.length > 1) {
      fetch(`http://10.0.2.2:8080/streets?name=${input}`)
        .then(response => response.json())
        .then((data: Array<IStreet>) => {
          setStreets(data);
          setPage(2);
        })
        .catch(error => {
          console.error(error);
        });
    } 
    if (input?.length == 0) {
      setPage(1);
    }
  }, [input]);

  const renderSwitch = (page: number) => {
    switch (page) {
      case 1:
        return <HomeContainer heroText={heroText} />;
      case 2:
        return (
          <SearchingContainer
            streets={streets}
            handleFetchByStreet={handleFetchByStreet}
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
