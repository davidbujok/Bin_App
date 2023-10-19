import React from 'react'
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles, colourPalette, colourPaletteBackground, main } from '../styles/stylesSheet'

function BaseContainer({ navbar, search, setInput, input, getLocation, renderSwitch, page, setPage, setDates, setAddress, setLocation, setNewFormat }) {

  const clearInputs = () => {
    setAddress({})
    setLocation(false)
    setNewFormat(undefined)
    setInput(null)
    setPage(1)
    Keyboard.dismiss()
    }

  return (
    <View style={{flex:1}}>
      <View style={main.container}>
        <View style={navbar.container}>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={[navbar.logoBlocks, colourPaletteBackground.blue,]}></View>
            <View style={[navbar.logoBlocks, colourPaletteBackground.green,]}></View>
            <View style={[navbar.logoBlocks, colourPaletteBackground.brown,]}></View>
            <View style={[navbar.logoBlocks, colourPaletteBackground.red,]}></View>
          </View>
          <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={clearInputs}>
            <Text style={[navbar.logo, colourPalette.green]}>W</Text>
            <Text style={[navbar.logo, colourPalette.black]}>hich </Text>
            <Text style={[navbar.logo, colourPalette.blue]}>B</Text>
            <Text style={[navbar.logo, colourPalette.black]}>in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ display: 'flex', alignSelf: 'center', marginTop: -20 }}>
          <View style={search.container}>
            <Pressable>
              <Text onPress={() => {
                setPage(1)
                setInput("")
                setDates(null)
              }}></Text>
            </Pressable>
              <TextInput
              placeholder='search street name'
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
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 3, paddingTop: 35 }}>
        <View style={[navbar.logoBlocks, colourPaletteBackground.blue,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.green,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.red,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.brown,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.blue,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.green,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.red,]}></View>
        <View style={[navbar.logoBlocks, colourPaletteBackground.brown,]}></View>
      </View>
      </View>
  )
}

export default BaseContainer
