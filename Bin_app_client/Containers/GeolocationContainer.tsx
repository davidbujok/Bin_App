// import { PermissionsAndroid } from 'react-native';
// import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import { useEffect } from 'react';

// Geocoder.init('API');

//   useEffect(() => {
//     // Geocoder.from(55.949531514154025, -3.0976942469294793)
//     if (location) {
//     Geocoder.from(location['coords']['latitude'], location['coords']['longitude'])
//       .then(json => {
//         let addressComponent = json.results;
//         setAddress(addressComponent[0].formatted_address.valueOf());
//       })
//       .then(console.log(address))
//       .catch(error => console.warn(error));
//     }
//   }, [location]);

//  const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Geolocation Permission',
//           message: 'Can we access your location?',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       console.log('granted', granted);
//       if (granted === 'granted') {
//         console.log('You can use Geolocation');
//         return true;
//       } else {
//         console.log('You cannot use Geolocation');
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//   };


// export const locationServices = {
//     getLocation(setLocation) {
//       const result = requestLocationPermission();
//       result.then(res => {
//           console.log('res is:', res);
//           if (res) {
//           Geolocation.getCurrentPosition(
//               position => {
//               console.log(position);
//               setLocation(position);
//               console.log(position['coords']['latitude']);
//               console.log(position['coords']['longitude']);
//               },
//               error => {
//               // See error code charts below.
//               console.log(error.code, error.message);
//               setLocation(false);
//               },
//               {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//               )}
//           })}}
