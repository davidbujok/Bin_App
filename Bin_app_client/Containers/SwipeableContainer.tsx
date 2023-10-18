import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates}) => {
  const [firstBinType, setFirstBinType] = useState<String>('');
  const [secondBinType, setSecondBinType] = useState<String>('');

  // const binTypes = {
  //   recycling: require('/static/images/mixedbin.png'),
  //   glass: require('../static/images/mixedbin.png'),
  //   garden: require('/static/images/mixedbin.png'),
  //   waste: require('/static/images/mixedbin.png'),
  //   recyclingBox: require('/static/images/mixedbin.png'),
  //   recylingGlass: require('/static/images/mixedbin.png'),
  //   wasteGlass: require('/static/images/mixedbin.png'),
  // };
  const mixedbin = require('../static/images/mixedbin.png');
  const glass = require('../static/images/bluebin.png');
  console.log(SCREEN_WIDTH);

  const renderSwitch = (binType: string) => {
    switch (binType) {
      case ("waste"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General Waste</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            </View>
            </>
            )
      case ("glass"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Glass</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            </View>
            </>
            )
      case ("garden"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Garden Waste</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            </View>
            </>
            )
      case ("recycling"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Recycling</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
            )
      case ("waste glass"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Garden & Glass</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
          )
      case ("recycling glass"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Recycling & Glass</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
          )
      case ("recycling box"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Recycling Box</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
            )
  }
  };

  return (
    <ScrollView
      style={{paddingTop: 20}}
      horizontal
      snapToInterval={SCREEN_WIDTH}>
      {dates &&
        dates.map(date => (
          <View
            style={{
              width: SCREEN_WIDTH,
              alignItems: 'center', 
            }}>
            <Text style={{fontSize: 24, fontWeight: '300'}}>Collection on</Text>
            <Text style={{fontSize: 30, fontWeight: '500', color: "#291D29"}}>{date.date}</Text>
            {renderSwitch(date.binType)}
          </View>
        ))}
    </ScrollView>
  );
};

export default Carousel;

const image = StyleSheet.create({
  imageSize: {
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH * 0.45,
  },
});
