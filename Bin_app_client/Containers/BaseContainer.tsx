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
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  styles,
  colourPalette,
  colourPaletteBackground,
  main,
  logo,
} from '../styles/stylesSheet';
import PageType from './../Helpers/PageType';
import RemindersScreen from '../Components/RemindersScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

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
  address,
  modalRemindersVisible,
  setModalRemindersVisible,
}) {
  const clearInputs = () => {
    setAddress({});
    setLocation(false);
    setNewFormat(undefined);
    setInput(null);
    setPage(PageType.Home);
    Keyboard.dismiss();
  };
  const [hasReminders, setHasReminders] = useState(false);

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  if (Platform.OS === 'android') {
    PushNotification.getScheduledLocalNotifications(notifications => {
      if (notifications.length > 0) {
        setHasReminders(true);
      }
    });
  } else if (Platform.OS === 'ios') {
    PushNotificationIOS.getPendingNotificationRequests(notifications => {
      if (notifications.length > 0) {
        setHasReminders(true);
      }
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View style={main.container}>
        <View style={navbar.container}>
          <Text style={logo.logoSize}>♻️</Text>
          {/* <View style={{flexDirection: 'column', gap: 5}}>
            <View
              style={[navbar.logoBlocks, colourPaletteBackground.blue]}></View>
            <View
              style={[navbar.logoBlocks, colourPaletteBackground.green]}></View>
            <View
              style={[navbar.logoBlocks, colourPaletteBackground.brown]}></View>
            <View
              style={[navbar.logoBlocks, colourPaletteBackground.red]}></View>
          </View> */}
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={clearInputs}>
              <Text style={[navbar.logo, colourPalette.green]}>W</Text>
              <Text style={[navbar.logo, colourPalette.black]}>hich </Text>
              <Text style={[navbar.logo, colourPalette.blue]}>B</Text>
              <Text style={[navbar.logo, colourPalette.black]}>in</Text>
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
                  //   setInput('');
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

            {/* <Pressable style={[styles.button]} onPress={getLocation}>
              <Text style={styles.icon}>📍</Text>
            </Pressable> */}
          </View>
          <View>{renderSwitch(page)}</View>
          {page == PageType.Home && hasReminders == true && (
            <View
              style={[main.container, {display: 'flex', alignItems: 'center'}]}>
              <TouchableOpacity
                style={[styles.smallButton, {backgroundColor: '#6aa62e'}]}
                onPress={() => {
                  setModalRemindersVisible(true);
                }}>
                <Text style={styles.buttonTextColor}>Reminders</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 3,
          paddingTop: 35,
        }}>
        <View style={[navbar.logoBlocks, colourPaletteBackground.blue]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.green]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.red]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.brown]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.blue]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.green]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.red]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.brown]}></View>
      </View>
      <Text
        style={{color: 'black', padding: 10}}
        onPress={() =>
          Linking.openURL('http://www.binday.info/privacy-policy/')
        }>
        Privacy Policy
      </Text>
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
            <RemindersScreen
              dates={dates}
              streetName={address}
              setHasReminders={setHasReminders}></RemindersScreen>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default BaseContainer;
