import React, { useState } from "react";
import {View, FlatList, Dimensions, Text, Image, StyleSheet} from 'react-native'
import { styles } from "../styles/stylesSheet";
import { requestLocationPermission } from "./PermissionContainer";
import { GestureHandlerRouteView } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates}) => {
  const [firstBinType, setFirstBinType] = useState<String>("");
  const [secondBinType, setSecondBinType] = useState<String>("");
  const binTypes = {
    "recycling": "../static/images/mixedbin.png",
    "glass": "/static/images/mixedbin.png",
    "garden": "/static/images/mixedbin.png",
    "waste": "/static/images/mixedbin.png", 
    "recycling box": "/static/images/mixedbin.png",
    "recyling glass":"/static/images/mixedbin.png", 
    "waste glass": "/static/images/mixedbin.png", 
    }
  const mixedbin = require('../static/images/mixedbin.png');
  console.log(SCREEN_WIDTH)

  const getImage = (binType) => {
    const x = binTypes[binType]
    }

    return (
    <View >
    <FlatList data={dates}
    horizontal
    showsHorizontalScrollIndicator={false}
    snapToInterval={SCREEN_WIDTH}
    snapToAlignment='center'
    decelerationRate={"fast"}
    keyExtractor={date => date.id}
    renderItem={ date => { 
      return(
          <View style={{width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center'}}> 
          <Text>{date.item.binType}</Text>
          <Text>Your next bin is on</Text>
          <Text>{date.item.date}</Text>
          <Image 
          style={image.imageSize}
          source={mixedbin}>
          </Image>
          </View>
    )}}
    />

    </View>
    )
  }

  export default Carousel


const image = StyleSheet.create({
  imageSize: {
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH * 0.45
  }
})
