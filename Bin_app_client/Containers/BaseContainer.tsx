import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { styles,colourPalette,colourPaletteBackground,main } from '../styles/stylesSheet'

function BaseContainer({navbar,search,setInput,input,getLocation,renderSwitch,page, setPage, setDates}) {

  return (
    <>
    <View style={main.container}>
      <View style={navbar.container}>
      <View style={{flexDirection: 'column', gap: 5}}>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      </View>
      <View style={{flexDirection: 'row'}}>
      <Text style={[navbar.logo, colourPalette.green]}>W</Text>
      <Text style={[navbar.logo, colourPalette.black]}>hat </Text>
      <Text style={[navbar.logo, colourPalette.blue]}>B</Text>
      <Text style={[navbar.logo, colourPalette.black]}>in</Text>
      </View>
      </View>
      <View style={{display: 'flex', alignSelf: 'center',  marginTop: -20}}>
      <View style={search.container}>
        <Pressable>
            <Text onPress={()=> {
                setPage(1) 
                setInput("")
                setDates(null)
            }}>Back</Text>
        </Pressable>
            <TextInput
            onChangeText={setInput}
            value={input}
            style={search.input}
            />
            <Pressable style={[styles.button]} onPress={getLocation}>
            <Text style={styles.icon}>📍</Text>
            </Pressable>
            </View>
      <Text>{renderSwitch(page)};</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 3, paddingTop: 35}}>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.blue, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.green, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.red, ]}></View>
      <View style={[ navbar.logoBlocks, colourPaletteBackground.brown, ]}></View>
      </View>
    
    </>
  )
}

export default BaseContainer