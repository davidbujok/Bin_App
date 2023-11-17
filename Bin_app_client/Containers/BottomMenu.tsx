import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {bottomBar} from '../styles/stylesSheet';
import PageType from '../Helpers/PageType';

function BottomMenu({setPage, setModalRemindersVisible, clearInputs}) {
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

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
      {/* <KeyboardAvoidingView */}
      {/* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}
      {/* style={{...bottomBar.container, bottom: keyboardStatus ? '100%' : 0}}> */}
      <TouchableOpacity style={bottomBar.option} onPress={() => clearInputs()}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={bottomBar.option}
        onPress={() => setModalRemindersVisible(true)}>
        {/* DOESNT LIKE LAST CHAR  */}
        <Text>Reminderss</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={bottomBar.option}
        onPress={() => setPage(PageType.Infos)}>
        {/* DOESNT LIKE LAST CHAR  */}
        <Text>Infosr</Text>
      </TouchableOpacity>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}

export default BottomMenu;
