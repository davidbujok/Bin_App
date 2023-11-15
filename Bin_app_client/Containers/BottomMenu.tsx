import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {bottomBar} from '../styles/stylesSheet';
import PageType from '../Helpers/PageType';

function BottomMenu({setPage, setModalRemindersVisible, clearInputs}) {
  return (
    <View style={bottomBar.container}>
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
    </View>
  );
}

export default BottomMenu;
