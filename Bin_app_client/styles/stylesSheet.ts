import {
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import PageType from '../Helpers/PageType';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// const windowDimensions = useWindowDimensions();
const fontScale = PixelRatio.getFontScale();

const getFontSize = size => size / fontScale;

export const ColorTheme = {
  blue: '#1c6fc4',
  red: '#f14135',
  brown: '#9a6d38',
  green: '#6aa62e',
  black: '#19231a',
};

export const styles = StyleSheet.create({
  streetName: {
    fontWeight: 'bold',
    fontSize: RFPercentage(3.75),
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  smallButton: {
    backgroundColor: '#1c6fc4',
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    padding: SCREEN_WIDTH * 0.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: SCREEN_HEIGHT * 0.05,
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
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: SCREEN_WIDTH * 0.05,
    minWidth: SCREEN_WIDTH * 0.8,
    maxWidth: SCREEN_WIDTH * 0.8,
    minHeight: SCREEN_HEIGHT * 0.7,
    maxHeight: SCREEN_WIDTH * 0.7,
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
    marginBottom: SCREEN_HEIGHT * 0.015,
    marginRight: -SCREEN_WIDTH * 0.01,
    alignSelf: 'flex-end',
    height: SCREEN_HEIGHT * 0.045,
    width: SCREEN_WIDTH * 0.09,
  },
});

export const bottomBar = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    position: 'absolute',
    minHeight: SCREEN_HEIGHT * 0.072,
    maxHeight: SCREEN_HEIGHT * 0.072,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    gap: 10,
  },
  option: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: SCREEN_HEIGHT * 0.005,
  },
  text: {
    fontSize: RFPercentage(1.5),
  },
  icons: {
    height: SCREEN_HEIGHT * 0.035,
  },
  icons_active: {
    tintColor: 'white',
  },
  text_active: {
    color: 'white',
  },
  icons_inactive: {
    tintColor: 'black',
  },
  text_inactive: {
    color: 'black',
  },
  menu_inactive: {
    backgroundColor: 'white',
  },
  menu_active_reminders: {
    backgroundColor: ColorTheme.red,
  },
  menu_active_home: {
    backgroundColor: ColorTheme.green,
  },
  menu_active_settings: {
    backgroundColor: ColorTheme.blue,
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
  },
});

export const search = StyleSheet.create({
  input: {
    minWidth: SCREEN_WIDTH - SCREEN_WIDTH * 0.25,
    maxWidth: SCREEN_WIDTH - SCREEN_WIDTH * 0.25,
    borderWidth: 1,
    height: SCREEN_HEIGHT * 0.075,
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
    maxWidth: SCREEN_WIDTH,
    // minHeight: SCREEN_HEIGHT
  },
  baseText: {
    marginLeft: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_WIDTH * 0.1,
    includeFontPadding: false,
    maxWidth: SCREEN_WIDTH,
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
    fontSize: getFontSize(80),
    marginBottom: RFPercentage(0),
    padding: 0,
    includeFontPadding: false,
  },
  joinText: {
    fontSize: getFontSize(50),
    alignSelf: 'center',
    includeFontPadding: false,
  },
  letter: {
    fontSize: RFPercentage(13),
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
  },
});

export const info = StyleSheet.create({
  text: {
    color: 'black',
    padding: 10,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: RFPercentage(3),
  },
  container: {
    minWidth: SCREEN_WIDTH * 0.8,
  },
});
