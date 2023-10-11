import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Platform,
    TextInput
  } from 'react-native';

export const styles = StyleSheet.create({
    input:{
      width:100,
      height:40,
      borderWidth:1,
      padding:10,
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingLeft: 5,
      paddingRight:5,
      justifyContent:'center',
      alignItems:'center',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0 // if this device is android, set padding to top otherwise don't, this is because SafeAreaView doesn't work on Android?
    },
    smallButton:{
        backgroundColor:'red',
        width:100,
        padding:10,
        alignItems:'center',
    },
    textColor:{
        color:'white'
    }

  })