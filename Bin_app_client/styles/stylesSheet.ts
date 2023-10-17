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
} from 'react-native';
type Color = {
  blue: '#1c6fc4';
  red: '#f14135';
  brown: '#9a6d38';
  green: '#6aa62e';
  black: '#19231a';
};

export const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 90,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    // backgroundColor: '#6aa62e',
  },
  icon: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // if this device is android, set padding to top otherwise don't, this is because SafeAreaView doesn't work on Android?
  },
  smallButton: {
    backgroundColor: 'red',
    width: 100,
    padding: 10,
    alignItems: 'center',
  },
  textColor: {
    color: 'white',
  },
  streetsList:{
    display:'flex',
    justifyContent:'center',
    gap:5,
  }
});

export const navbar = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  logo: {
    fontSize: 55,
    fontWeight: '900',
  },
  input: {
    maxWidth: 250,
    borderWidth: 0.8,
    height: 40,
    borderRadius: 10,
    fontSize: 20,
  },
  logoBlocks: {
    width: 50,
    minHeight: 7,
  },
});

export const search = StyleSheet.create({
  input: {
    minWidth: 250,
    borderWidth: 0.8,
    height: 40,
    borderRadius: 10,
    fontSize: 20,
  },
  container: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const main = StyleSheet.create({
  container: {
    display: 'flex',
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
    fontSize: 84,
    marginBottom: -25,
  },
  joinText: {
    fontSize: 24,
    marginTop: 25,
    alignSelf: 'center',
  },
  letter: {
    fontSize: 90,
  },
  mid: {
    fontWeight: "400",
  },
  bold: {
    fontWeight: "900",
  },
  light: {
    fontWeight: "200",
  },

})
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
    maxWidth: 150,
    height: 20,
  },
});
