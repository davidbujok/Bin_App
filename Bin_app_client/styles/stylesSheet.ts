import {StatusBar, StyleSheet, Platform, Dimensions, useWindowDimensions, PixelRatio} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// const windowDimensions = useWindowDimensions();
const fontScale = PixelRatio.getFontScale()



type Color = {
  blue: '#1c6fc4';
  red: '#f14135';
  brown: '#9a6d38';
  green: '#6aa62e';
  black: '#19231a';
};

export const styles = StyleSheet.create({
  streetName: {
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    maxWidth: RFPercentage(40),
  },
  smallButton: {
    backgroundColor: '#1c6fc4',
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    padding: SCREEN_WIDTH * 0.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: SCREEN_HEIGHT * 0.05 ,
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
    gap: SCREEN_WIDTH * 0.01,
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
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    gap: SCREEN_WIDTH * 0.025,
  },
  logo: {
    fontSize: SCREEN_WIDTH * 0.125,
    fontWeight: '900',
  }
});

export const search = StyleSheet.create({
  input: {
    minWidth: SCREEN_WIDTH - SCREEN_WIDTH * 0.25,
    maxWidth: SCREEN_WIDTH - SCREEN_WIDTH * 0.25,
    borderWidth: 1,
    height: SCREEN_HEIGHT * 0.065,
    borderRadius: 10,
    fontSize: SCREEN_WIDTH * 0.04,
    textAlign: 'left',
    paddingLeft: SCREEN_WIDTH * 0.035,
    paddingRight: SCREEN_WIDTH * 0.035,
    color: '#000000',
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
    borderWidth: 1,
    borderColor: 'red',
    maxWidth: SCREEN_WIDTH,
    // minHeight: SCREEN_HEIGHT
  },
  baseText: {
    marginLeft: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_WIDTH * 0.1,
    includeFontPadding: false,
    maxWidth:  SCREEN_WIDTH,
    // flexWrap: 'wrap'
  },
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
    fontSize: RFPercentage(15) ,
    marginBottom: RFPercentage(0),
    padding: 0,
    includeFontPadding: false,
  },
  joinText: {
    fontSize: 40 * fontScale,
    alignSelf: 'center',
    includeFontPadding: false,
  },
  letter: {
    fontSize:40 *fontScale,
    includeFontPadding: false,
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
    color: 'black',
  }
});

