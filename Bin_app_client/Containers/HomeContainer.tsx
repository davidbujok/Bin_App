import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View, ScrollView, Dimensions} from 'react-native';
import {colourPalette, main} from '../styles/stylesSheet';

function HomeContainer({heroText}) {

  const SCREEN_HEIGHT = Dimensions.get('window').height

  return (
    
    <View onTouchStart={() => Keyboard.dismiss()} style={[main.baseText]}>
          <Text style={[heroText.hero, heroText.mid, colourPalette.green]} >
            Save
          </Text>
          <Text style={[heroText.hero, heroText.light, colourPalette.green]} >
            the
          </Text>
          <Text style={[heroText.hero, heroText.bold, colourPalette.green]} >
            Planet.
          </Text>
          <Text style={[heroText.joinText, heroText.mid, colourPalette.blue]} >
            and
          </Text>
          <View style={{flexDirection: 'row', flexWrap:'wrap', maxWidth : '100%', paddingBottom: SCREEN_HEIGHT * 0.08}}>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]} >
              R
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.brown]} >
              e
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.blue]} >
              c
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.green]} >
              y
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.red]} >
              c
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.brown]} >
              l
            </Text>
            <Text style={[heroText.letter, heroText.bold, colourPalette.blue]} >
              e
            </Text>
          </View>
        </View>
  
  );
}

export default HomeContainer;
