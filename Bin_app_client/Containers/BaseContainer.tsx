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

  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View style={main.container}>
        <View style={navbar.container}>
          <Text style={logo.logoSize}>
          ♻️
          </Text>
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
            <Pressable
              onPress={() => {
                setModalRemindersVisible(true);
              }}>
              <Text style={styles.icon}>⏰</Text>
            </Pressable>
          </View>
        </View>
        <View style={{display: 'flex', alignSelf: 'center', marginTop: -20}}>
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
              placeholder="search street name"
              onChangeText={setInput}
              value={input}
              style={search.input}
            />
            <Pressable style={[styles.button]} onPress={getLocation}>
              <Text style={styles.icon}>📍</Text>
            </Pressable>
          </View>
          <View>{renderSwitch(page)}</View>
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
              streetName={address}></RemindersScreen>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default BaseContainer;
