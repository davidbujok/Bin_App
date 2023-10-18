import React from 'react'
import { Keyboard, Pressable, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { styles,colourPalette } from '../styles/stylesSheet'


function HomeContainer({heroText}) {
  return (
    <>
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={{alignSelf: 'center', paddingTop: 40}}>
            <Text style={[heroText.hero, heroText.mid, colourPalette.green]}>Save</Text>
            <Text style={[heroText.hero, heroText.light, colourPalette.green]}>the</Text>
            <Text style={[heroText.hero, heroText.bold, colourPalette.green]}>Planet.</Text>
            <Text style={[heroText.joinText, heroText.mid, colourPalette.blue]}>and</Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]}>R</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.brown, ]}>e</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.blue, ]}>c</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.green, ]}>y</Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]}>c</Text> 
            <Text style={[ heroText.letter, heroText.bold, colourPalette.brown, ]}>l</Text>
            <Text style={[ heroText.letter, heroText.bold, colourPalette.blue, ]}>e</Text>
            </View>
            </View>
    </TouchableWithoutFeedback>
    </>
  )
}

export default HomeContainer
