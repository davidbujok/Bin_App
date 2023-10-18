import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/stylesSheet';
import { IDate } from '../styles/interfaces';
import PushNotification from 'react-native-push-notification';
import checkApplicationPermission from './PermissionContainer';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates, streetName}) => {
  const mixedbin = require('../static/images/mixedbin.png');
  const glass = require('../static/images/bluebin.png');
  // console.log(SCREEN_WIDTH);

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
      case (("recycling garden") || ("garden recycling")):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Recycling & Garden</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
            )
      case (("waste garden")):
      case (("garden waste")):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General & Garden</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
            )
      case ("glass garden" || "garden glass"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Glass & Garden</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
            )
      case ("waste glass" || "glass waste"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General & Glass</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            <Image style={image.imageSize} source={mixedbin}></Image>
            </View>
            </>
          )
      case ("recycling glass" || "glass recycling"):
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
  // console.log(dates)

  const handleNotification = async (date: IDate) =>{
    await checkApplicationPermission()
    console.log(`${date.binType}`)
    PushNotification.localNotification({
      channelId:"Date-Notification",
      title: "date.binType",
      message: `Date :`
    })
    const splitedDate = date.date.split("-")
    
    let getYear = splitedDate[0]
    let getMonth = splitedDate[1]
    let getDay = splitedDate[2]

    const year:number = Number(getYear)
    const month:number = Number(getMonth)
    const day:number = Number(getDay)
    console.log(typeof year, typeof month, typeof day)

    PushNotification.localNotificationSchedule({
      channelId: "Date-Notification",
      title: `Notification for ${date.date}`,
      message: `Your bin collection type for ${date.date} is ${date.binType}`,
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle:true
    })
  }
    
  

  return (
    <ScrollView
      style={{paddingTop: 20}}
      horizontal
      snapToInterval={SCREEN_WIDTH}>
      {dates &&
        dates.map(date => (
          <View
            key={date.id}
            style={{
              width: SCREEN_WIDTH,
              alignItems: 'center', 
            }}>
            <Text>{streetName}</Text>
            <Text style={{fontSize: 24, fontWeight: '300'}}>Collection on</Text>
            <Text style={{fontSize: 30, fontWeight: '500', color: "#291D29"}}>{date.date}</Text>
            {renderSwitch(date.binType)}
            <TouchableOpacity style={styles.smallButton} onPress={() => handleNotification(date)}>
              <Text style={styles.textColor}>Click me</Text>
            </TouchableOpacity>
           
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
