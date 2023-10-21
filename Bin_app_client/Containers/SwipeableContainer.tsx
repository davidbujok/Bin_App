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
import { handleNotification } from '../Components/NotificationFunctionality';
import { IDate } from '../styles/interfaces';
import DateTimePicker from '../Components/DateTimePicker';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates, streetName}) => {
  const mixedbin = require('../static/images/mixedbin.png');
  const glass = require('../static/images/bluebin.png');
  const waste = require('../static/images/general.png')
  const garden = require('../static/images/garden.png')


  const renderSwitch = (binType: string) => {
    switch (binType) {
      case ("waste"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General Waste</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={waste}></Image>
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
            <Image style={image.imageSize} source={garden}></Image>
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
            <Image style={image.imageSize} source={garden}></Image>
            </View>
            </>
            )
      case (("waste garden")):
      case (("garden waste")):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General & Garden</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={garden}></Image>
            <Image style={image.imageSize} source={waste}></Image>
            </View>
            </>
            )
      case ("glass garden" || "garden glass"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>Glass & Garden</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={garden}></Image>
            <Image style={image.imageSize} source={glass}></Image>
            </View>
            </>
            )
      case ("waste glass" || "glass waste"):
        return (
            <>
            <Text style={{fontSize: 34, fontWeight: '600', color: "#291D29"}}>General & Glass</Text>
            <View style={{flexDirection: "row", gap: -40, paddingTop: 25}}>
            <Image style={image.imageSize} source={glass}></Image>
            <Image style={image.imageSize} source={waste}></Image>
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

  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"]
  const [pickedDate,setPickedDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  console.log("Picked date day : ",pickedDate.getDate())
  

  const handlePickedDateNotification = async () => {
    await setOpen(true)
  }

return (
  <ScrollView
    style={{ paddingTop: 20 }}
    horizontal
    snapToInterval={SCREEN_WIDTH}
  > 
    {/* <View>
        {clicked == true && <DatePicker date={pickedDate} onDateChange={setPickedDate}/>
      }
        <TouchableOpacity>
        <Text onPress={()=> setClicked(true)}>Clikc</Text>
        </TouchableOpacity>
        </View> */}
        <View>
        <DateTimePicker setPickedDate={setPickedDate} open={open} setOpen={setOpen}/>
        </View>
    {dates &&
      dates.map((date: IDate) => {
        const splitDate = date.date.split("-");
        const date1 = new Date()
        date1.setFullYear(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]))
        return (
          <View
            key={date.id}
            style={{
              width: SCREEN_WIDTH,
              alignItems: "center",
            }}
          >
            <Text style={styles.streetName}>{streetName.toUpperCase()}</Text>
            <Text style={{ fontSize: 24, fontWeight: "400" }}>Collection on</Text>
            <Text style={{ fontSize: 30, fontWeight: "500", color: "#291D29" }}>
              {weekdays[date1.getDay()]} {date1.getDate()} {months[date1.getMonth()]}
            </Text>
            {renderSwitch(date.binType)}
            <TouchableOpacity style={styles.smallButton} onPress={() => handleNotification(date,pickedDate)}>
              <Text style={styles.buttonTextColor}>Add Reminder</Text>
            </TouchableOpacity>

          </View>
        );
      })}
      
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
