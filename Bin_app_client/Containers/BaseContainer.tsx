import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Linking,
  ScrollView
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  styles,
  colourPalette,
  colourPaletteBackground,
  main,
  logo,
} from '../styles/stylesSheet';
import PageType from '../Helpers/PageType';
import RemindersScreen from '../Components/RemindersScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import HomeRemindersScreen from '../Components/HomeRemindersScreen';

function BaseContainer({
  navbar,
  search,
  setInput,
  input,
  getLocation,
  renderSwitch,
  page,
  setPage,
  setDates,
  setAddress,
  setLocation,
  setNewFormat,
  dates,
  address

}) {
  const clearInputs = () => {
    setAddress({});
    setLocation(false);
    setNewFormat(undefined);
    setInput(null);
    setPage(PageType.Home);
    Keyboard.dismiss();
  };

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const [modalRemindersVisible, setModalRemindersVisible] = useState(false);



  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={main.container}>
        <View style={navbar.container}>
          <Text style={logo.logoSize} maxFontSizeMultiplier={1.3}>♻️</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={clearInputs}>
              <Text style={[navbar.logo, colourPalette.green]} maxFontSizeMultiplier={1.3}>W</Text>
              <Text style={[navbar.logo, colourPalette.black]} maxFontSizeMultiplier={1.3}>hich </Text>
              <Text style={[navbar.logo, colourPalette.blue]} maxFontSizeMultiplier={1.3}>B</Text>
              <Text style={[navbar.logo, colourPalette.black]} maxFontSizeMultiplier={1.3}>in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginTop: -SCREEN_WIDTH * 0.04,
          }}>
          <View style={search.container}>
            <Pressable>
              <Text
                onPress={() => {
                  setPage(PageType.Home);
                  setDates(null);
                }}></Text>
            </Pressable>
            <TextInput
              placeholderTextColor={'#000000'}
              placeholder="Enter street name"
              onChangeText={setInput}
              value={input}
              style={search.input}
            />
          </View>
          <View>{renderSwitch(page)}</View>
          </View>
      </View>
      <View style={{padding: 10, alignSelf: 'center'}}>
        <Pressable style={styles.smallButton} onPress={() => setModalRemindersVisible(true)}>
          <Text style={styles.buttonTextColor}>Reminders</Text>
        </Pressable>
        <Text
          style={{color: 'black', padding: 10}}
          onPress={() =>
            Linking.openURL('http://www.binday.info/privacy-policy/')
          }>
          Privacy Policy
        </Text>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRemindersVisible}
        onRequestClose={() => {
          setModalRemindersVisible(!modalRemindersVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalRemindersVisible(!modalRemindersVisible)}>
              <Text style={styles.modalCloseX}>Close</Text>
            </Pressable>
            <HomeRemindersScreen></HomeRemindersScreen>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default BaseContainer;
