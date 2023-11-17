import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {bottomBar} from '../styles/stylesSheet';
import PageType from '../Helpers/PageType';

function BottomMenu({setPage, setModalRemindersVisible, clearInputs}) {
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

  const homeIcon = require('../static/images/home.png')
  const infoIcon = require('../static/images/info.png')
  const bellIcon = require('../static/images/bell.png')

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
        style={bottomBar.option}
        onPress={() => setModalRemindersVisible(true)}>
        <Image resizeMode='contain' source={bellIcon} style={bottomBar.icons}></Image>
        <Text style={bottomBar.text}>Reminders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={bottomBar.option} onPress={() => clearInputs()}>
        <Image resizeMode='contain' source={homeIcon} style={bottomBar.icons}></Image>
        <Text style={bottomBar.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={bottomBar.option}
        onPress={() => setPage(PageType.Infos)}>
        <Image resizeMode='contain' source={infoIcon} style={bottomBar.icons}></Image>
        <Text style={bottomBar.text}>Info</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomMenu;
