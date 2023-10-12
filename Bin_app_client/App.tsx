import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
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
} from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {IStreet} from './styles/interfaces';
import {styles} from './styles/stylesSheet';


  function App(): JSX.Element {
  const [streets, setStreets] = useState<Array<IStreet>>();
  const [input, setInput] = useState<string>();
  const [fetchData, setFetchData] = useState<Boolean>(false);
  const [location, setLocation]  = useState<GeoPosition | Boolean>(false);

  const date:Date = new Date;

//   const year: string = date.getFullYear.toString();
//   let getMonth: number = date.getMonth();
//   let month:string = "";
//   let getDay: number = date.getDay();
//   let day: string = "";


// if(getMonth<10){
//   month = "0" + getMonth.toString();
// }else{
//   month = getMonth.toString();
// }

// if(getDay<10){
//   day = "0" + getDay.toString();
// }else{
//   day = getDay.toString();
// }

let year = "2023"
let month = "10"
let day = "25"


 const dateInstance: string = year + month + day;

  if (input && input.length > 3) {
    // if (fetchData === false) {
      fetch(`http://10.0.2.2:8080/streets?name=${input}`)
        .then(response => response.json())
        .then((data: Array<IStreet>) => {
          setStreets(data);
          setFetchData(true);
        })
        .catch(error => {
          console.error(error);
        });
    // } else if (input.length <= 3) {
      // setFetchData(false);
    // }
  }

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
            },
            error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )}})};

  if (streets != null) {
    return (
      <SafeAreaView style={styles.container}>
        {streets.map((street)=>{
            return <Text>
              {street.name}</Text>
        })}
        <Text>{input}</Text>
        <TextInput onChangeText={setInput} value={input} style={styles.input} />
        <TouchableOpacity style={styles.smallButton}>
          <Text style={{color: 'white'}}>Click me</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <>
      <SafeAreaView>
        <Text>Loading...</Text>
        <View
          style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
          <Button title="Get Location" onPress={getLocation} />
        </View>
        <Text>sdasdasd: </Text>
        <Text>Longitude: </Text>
        <TextInput onChangeText={setInput} value={input} style={styles.input} />
        <Button title="click" onPress={() => setFetchData(true)}></Button>
      </SafeAreaView>
      </>
    );
  }
}
export default App;
