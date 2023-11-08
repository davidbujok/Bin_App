import {StatusBar, StyleSheet, Platform,Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Color = {
  blue: '#1c6fc4';
  red: '#f14135';
  brown: '#9a6d38';
  green: '#6aa62e';
  black: '#19231a';
};

export const styles = StyleSheet.create({
  // input: {
  //   width: 100,
  //   height: 40,
  //   borderWidth: 1,
  //   padding: 10,
  // },
  streetName: {
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH * 0.06,
    maxWidth:  SCREEN_WIDTH * 0.90,
    },
  // button: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   maxWidth: 90,
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  // },
  // logo: {
  //   fontSize: 40,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   paddingLeft: SCREEN_WIDTH * 0.05,

  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingLeft: SCREEN_WIDTH * 0.05,
  //   paddingRight: SCREEN_WIDTH * 0.05,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // if this device is android, set padding to top otherwise don't, this is because SafeAreaView doesn't work on Android?
  // },
  smallButton: {
    backgroundColor: '#1c6fc4',
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.05,    
    padding: SCREEN_WIDTH * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  buttonTextColor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH * 0.04,
    textAlign: 'center',
  },
  streetsList: {
    display: 'flex',
    padding: SCREEN_WIDTH * 0.01,
    justifyContent: 'center',
    gap: 5,
  },
  dateText: {
    fontSize: 20,
    color: '#291D29',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalCloseX: {
    marginBottom: 15,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});

export const navbar = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SCREEN_WIDTH * 0.025
    // borderColor: 'red',
    // borderWidth: 2,
  },
  logo: {
    fontSize: SCREEN_WIDTH * 0.125,
    fontWeight: '900',
  },
  // input: {
  //   maxWidth: 250,
  //   borderWidth: 0.8,
  //   height: 40,
  //   borderRadius: 10,
  //   fontSize: 20,
  // },
  // logoBlocks: {
  //   width: 50,
  //   minHeight: 7,
  // },
});

export const search = StyleSheet.create({
  input: {
    minWidth:  SCREEN_WIDTH - (SCREEN_WIDTH * (0.25)),
    maxWidth : SCREEN_WIDTH - (SCREEN_WIDTH * (0.25)),
    borderWidth: 1,
    height: SCREEN_HEIGHT * 0.065,
    borderRadius: 10,
    fontSize: SCREEN_WIDTH * 0.04,
    textAlign: 'left',
    // marginTop: SCREEN_HEIGHT * 0.025
    paddingLeft: SCREEN_WIDTH * 0.035,
    paddingRight: SCREEN_WIDTH * 0.035,
    color: '#000000'
  },
  container: {
    paddingTop: SCREEN_HEIGHT * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const main = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    margin: SCREEN_WIDTH * 0.025
  },
  baseText: {
    marginLeft: SCREEN_WIDTH * 0.025,
    marginRight: SCREEN_WIDTH * 0.025,
    marginTop: SCREEN_HEIGHT * 0.05,
    includeFontPadding: false,
  }
});

export const colourPalette = StyleSheet.create({
  blue: {
    color: '#1c6fc4',
  },
  red: {
    color: '#f14135',
  },
  brown: {
    color: '#9a6d38',
  },
  green: {
    color: '#6aa62e',
  },
  black: {
    color: '#291D29',
  },
});

export const heroText = StyleSheet.create({
  hero: {
    fontSize: SCREEN_WIDTH * 0.18,
    marginBottom: - (SCREEN_WIDTH /2) * 0.001,
    padding: 0,
    includeFontPadding: false
  },
  joinText: {
    fontSize: SCREEN_WIDTH * 0.10,
    // marginTop: 25,
    alignSelf: 'center',
    includeFontPadding: false
  },
  letter: {
    fontSize: SCREEN_WIDTH * 0.22,
    includeFontPadding: false

  },
  mid: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '900',
  },
  light: {
    fontWeight: '200',
  },
});
export const colourPaletteBackground = StyleSheet.create({
  blue: {
    backgroundColor: '#1c6fc4',
  },
  red: {
    backgroundColor: '#f14135',
  },
  brown: {
    backgroundColor: '#9a6d38',
  },
  green: {
    backgroundColor: '#6aa62e',
  },
  black: {
    backgroundColor: '#19231a',
  },
});

export const buttonStyle = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.01,
  },
});

export const logo = StyleSheet.create({
  logoSize: {
    fontSize: SCREEN_HEIGHT * 0.055,
    color:'black',
    // marginRight:-SCREEN_HEIGHT* 0.04,
    // marginLeft:  SCREEN_HEIGHT * 0.015
  },
});

// {fontSize:43,color:'black',marginRight:-80, marginLeft:-30}
