import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TextInput,
  Button,
  Touchable,
  PermissionsAndroid,
  TouchableOpacity,
  LogBox,
  Pressable,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

import {IStreet, IDate} from './styles/interfaces';
import Geocoder from 'react-native-geocoding';
import {
  heroText,
  navbar,
  search,
} from './styles/stylesSheet';
import {api} from './api-keys/api-keys';
import HomeContainer from './Containers/HomeContainer';
import SearchingContainer from './Containers/SearchingContainer';
import BaseContainer from './Containers/BaseContainer';

function App(): JSX.Element {
  // const [fetchData, setFetchData] = useState<Boolean>(false);
  const [streets, setStreets] = useState<Array<IStreet>>();
  const [dates, setDates] = useState<Array<IDate>>();
  const [input, setInput] = useState<string>();
  const [location, setLocation] = useState<GeoPosition | Boolean>(false);
  const [address, setAddress] = useState({});
  const [page, setPage] = useState<number>(1);

  // GEOLOCATION
  // MY API don't forget to delete because you will go bankrupt!
  Geocoder.init(api);

  useEffect(() => {
    // Geocoder.from(55.949531514154025, -3.0976942469294793)
    if (location) {
      Geocoder.from(
        location['coords']['latitude'],
        location['coords']['longitude'],
      )
        .then(json => {
          let addressComponent = json.results;
          setAddress(addressComponent[0].formatted_address.valueOf());
        })
        .then(console.log(address))
        .catch(error => console.warn(error));
    }
  }, [location]);
  // console.log(address['0']['address_components'][0]['long_name']);
  // console.log(address['0']['address_components'][1]['long_name']);
  // console.table(address);

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
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            console.log(position['coords']['latitude']);
            console.log(position['coords']['longitude']);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  // STOP GEOLOCATION

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
    console.log(dateInstance);

    fetch(
      `http://10.0.2.2:8080/collectionDates?street=${streetName}&date=${dateInstance}`,
    )
      .then(response => response.json())
      .then((data: Array<IDate>) => {
        setDates(data);
        // console.log("Street Data: ",data)
      })
      .catch(error => {
        console.error(error);
      });
  }; // End of handleFetch By Street


  useEffect(()=>{
    if (input && input.length > 1) {
      fetch(`http://10.0.2.2:8080/streets?name=${input}`)
        .then(response => response.json())
        .then((data: Array<IStreet>) => {
          setStreets(data);
          console.log("Streets: ",data)
          setPage(2)
        })
        .catch(error => {
          console.error(error);
        });
    }else{
    }
  },[input])


  

  const renderSwitch = (page: number) => {
    switch (page) {
      case 1:
        return (
          <HomeContainer 
            heroText={heroText} />
        );
      case 2:
        return (
          <SearchingContainer 
            streets={streets}
            handleFetchByStreet={handleFetchByStreet}
            dates={dates}
          />
        
          )
    }
  }
  
  return (
      <>
      <SafeAreaView>
        <BaseContainer 
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
      )
}
  
export default App;
