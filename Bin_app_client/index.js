/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import Bin_App_client from './App';
import {name as appName} from './app.json';
// import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent('BinAppclient', () => Bin_App_client); //trying to fig ios error

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });
