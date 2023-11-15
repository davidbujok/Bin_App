/**
 * @format
 */

import {AppRegistry, Platform, Text, TextInput} from 'react-native';
import Bin_App_client from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import { Component } from 'react';

// TextInput.defaultProps = Text.defaultProps || {};
// TextInput.defaultProps.maxFontSizeMultiplier = 1.5; // the maximum amount the font size will scale.




AppRegistry.registerComponent('BinAppclient', () => Bin_App_client); //trying to fig ios error


PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});
