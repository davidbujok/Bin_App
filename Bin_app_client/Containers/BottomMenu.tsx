import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageStyle,
} from 'react-native';
import {bottomBar} from '../styles/stylesSheet';
import PageType from '../Helpers/PageType';

function BottomMenu({
  modalReminderVisible,
  page,
  setPage,
  setModalRemindersVisible,
  clearInputs,
}) {
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

  const homeIcon = require('../static/images/home.png');
  const infoIcon = require('../static/images/info.png');
  const bellIcon = require('../static/images/bell.png');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
      // console.log('First bit');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      // console.log('second bit');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (keyboardStatus) {
    return null;
  }

  return (
    <View style={bottomBar.container}>
      <TouchableOpacity
        style={[
          bottomBar.option,
          modalReminderVisible
            ? bottomBar.menu_active_reminders
            : bottomBar.menu_inactive,
        ]}
        onPress={() => setModalRemindersVisible(true)}>
        <Image
          resizeMode="contain"
          source={bellIcon}
          style={[
            bottomBar.icons,
            modalReminderVisible
              ? bottomBar.icons_active
              : bottomBar.icons_inactive,
          ]}></Image>
        <Text
          style={
            ([bottomBar.text,
            modalReminderVisible
              ? bottomBar.text_active
              : bottomBar.text_inactive
            ])
          }>
          Reminders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          bottomBar.option,
          page == PageType.Home && modalReminderVisible == false
            ? bottomBar.menu_active_home
            : bottomBar.menu_inactive,
        ]}
        onPress={() => clearInputs()}>
        <Image
          resizeMode="contain"
          source={homeIcon}
          style={[
            bottomBar.icons,
            page == PageType.Home && modalReminderVisible == false
              ? bottomBar.icons_active
              : bottomBar.icons_inactive,
          ]}></Image>
        <Text
          style={
            ([bottomBar.text,
            page == PageType.Home && modalReminderVisible == false
              ? bottomBar.text_active
              : bottomBar.text_inactive])
          }>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          bottomBar.option,
          page == PageType.Infos && modalReminderVisible == false
            ? bottomBar.menu_active_settings
            : bottomBar.menu_inactive,
        ]}
        onPress={() => setPage(PageType.Infos)}>
        <Image
          resizeMode="contain"
          source={infoIcon}
          style={[
            bottomBar.icons,
            page == PageType.Infos && modalReminderVisible == false
              ? bottomBar.icons_active
              : bottomBar.icons_inactive,
          ]}></Image>
        <Text
          style={
            ([bottomBar.text,
            page == PageType.Infos && modalReminderVisible == false
              ? bottomBar.text_active
              : bottomBar.text_inactive])
          }>
          Info
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomMenu;
