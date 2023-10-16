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
  LogBox,
  Pressable,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {IStreet, IDate} from './styles/interfaces';
import Geocoder from 'react-native-geocoding';
import {
  buttonStyle,
  colourPalette,
  colourPaletteBackground,
  heroText,
  main,
  navbar,
  search,
  styles,
} from './styles/stylesSheet';

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
  Geocoder.init('your api key goes here');

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
        console.log(data);
        setDates(data);
        console.log(dates);
        // {dates!=null && console.log(dates.map((date)=> date.date))}
      })
      .catch(error => {
        console.error(error);
      });
  }; // End of handleFetch By Street

  if (input && input.length > 1) {
    fetch(`http://10.0.2.2:8080/streets?name=${input}`)
      .then(response => response.json())
      .then((data: Array<IStreet>) => {
        setStreets(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // if (streets != null) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <ScrollView>
  //         {streets.map(street => {
  //           return (
  //             <Text
  //               key={street.id}
  //               onPress={() => handleFetchByStreet(street.name)}>
  //               {street.name}
  //             </Text>
  //           );
  //         })}
  //         <TextInput
  //           onChangeText={setInput}
  //           value={input}
  //           style={styles.input}
  //         />
  //         <TouchableOpacity style={styles.smallButton}>
  //           <Text style={{color: 'white'}}>Click me</Text>
  //         </TouchableOpacity>
  //         {dates != null &&
  //           dates.map(date => (
  //             <Text key={date.id}>
  //               {date.date} {date.binType}
  //             </Text>
  //           ))}
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // } else {
  const renderSwitch = (page: number) => {
    switch (page) {
      case 1:
        return (
            <>
            <View style={search.container}>
            <TextInput
            onChangeText={setInput}
            value={input}
            style={search.input}
            />
            <Pressable style={[styles.button]} onPress={getLocation}>
            <Text style={styles.icon}>📍</Text>
            </Pressable>
            </View>
            <View style={{alignSelf: 'center', paddingTop: 40}}>
            <Text style={[heroText.hero, heroText.mid, colourPalette.green]}>Save</Text>
            <Text style={[heroText.hero, heroText.light, colourPalette.green]}>the</Text>
            <Text style={[heroText.hero, heroText.bold, colourPalette.green]}>Planet.</Text>
            <Text style={[heroText.joinText, heroText.mid, colourPalette.blue]}>and</Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]}>R</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.brown, ]}>e</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.blue, ]}>c</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.green, ]}>y</Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]}>c</Text> 
            <Text style={[ heroText.letter, heroText.bold, colourPalette.brown, ]}>l</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.blue, ]}>e</Text>
            </View>
            </View>
            </>
        );
    }
  }
  
  return (
      <>
      <SafeAreaView>
      <View style={main.container}>
      <View style={navbar.container}>
      <View style={{flexDirection: 'column', gap: 5}}>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      </View>
      <View style={{flexDirection: 'row'}}>
      <Text style={[navbar.logo, colourPalette.green]}>W</Text>
      <Text style={[navbar.logo, colourPalette.black]}>hat </Text>
      <Text style={[navbar.logo, colourPalette.blue]}>B</Text>
      <Text style={[navbar.logo, colourPalette.black]}>in</Text>
      </View>
      </View>
      <View style={{display: 'flex', alignSelf: 'center',  marginTop: 35}}>
      <Text>{renderSwitch(page)};</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 3, paddingTop: 35}}>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      </View>
      </SafeAreaView> 
      </>
      )
}
  
export default App;
