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
import {styles} from '../styles/stylesSheet';
// import {handleNotification} from '../Components/NotificationFunctionality';
import {IDate} from '../styles/interfaces';
import DateTimePicker from '../Components/DateTimePicker';

const mixedbin = require('../static/images/mixedbin.png');
const glass = require('../static/images/bluebin.png');
const waste = require('../static/images/general.png');
const garden = require('../static/images/garden.png');
const food = require('../static/images/garden.png');


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates, streetName}) => {
  const [open, setOpen] = useState(false);

  const [calendarDate, setCalendarDate] = useState<IDate | null>(null);

  const handlePickedDateNotification = (calendarDateObject: IDate) => {
    setCalendarDate(calendarDateObject);
    setOpen(true);
  };

  const daySinceStartOf2023 = () => {
    const diffInMs = new Date().getTime() - new Date('2023-01-01').getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  };

  const pagesForNextMonths = (iDates: Array<IDate>, fortnights = 4) => {
    const result: Array<IDate> = [];
    if (!iDates) {
      return [];
    }
    const todayDaySinceStartOf2023 = daySinceStartOf2023();
    let weeksSkipped = Math.floor(todayDaySinceStartOf2023 / 7);

    if (iDates[0].dateObject.getDay() < todayDaySinceStartOf2023 % 7) {
      // this week we missed it, skip another week. eg today is Wednesday (2)
      weeksSkipped += 1;
    }
    iDates.forEach(iDateToClone => {
      for (let fortnight = 0; fortnight < fortnights; fortnight++) {
        const newDate = {...iDateToClone};
        newDate.dateObject = new Date(Number(iDateToClone.dateObject));
        newDate.dateObject.setDate(
          iDateToClone.dateObject.getDate() + 14 * fortnight + weeksSkipped * 7,
        );
        //                                Plus fortnight to be unique
        newDate.id = newDate.dateObject.getTime()+fortnight;
        result.push(newDate);
      }
    });

    result.sort((date1, date2) => date1.id - date2.id); //sort by date (id)
    return result;
  };

  const renderSwitch = (binType: string) => {
    return imagesForWasteType(binType);
  };

  const binNameToImage = binName => {
    const resources = {
      recycling: mixedbin,
      glass: glass,
      waste: waste,
      garden: garden,
      box: waste,
      food: food
    };
    return <Image style={image.imageSize} source={resources[binName]}></Image>;
  };

  const imagesForWasteType = (binTypes: string) => {
    const binNames = binTypes.split(' ');
    binNames.sort();
    return (
      <>
        <Text style={{fontSize: 34, fontWeight: '600', color: '#291D29'}}>
          Recycling Box
        </Text>
        <View style={{flexDirection: 'row', gap: -40, paddingTop: 25}}>
          {binNameToImage(binNames[0])}
          {binNames.length > 1 ? binNameToImage(binNames[1]) : null}
        </View>
      </>
    );
  };

  const dateAsString = dateObject => {
    return dateObject.toLocaleString('default', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const pageForIDate = (pickupInfo: IDate) => {
    // const dateObject: Date = new Date(pickupInfo.date);
    return (
      <View
        key={pickupInfo.id}
        style={{
          width: SCREEN_WIDTH,
          alignItems: 'center',
        }}>
        <Text style={styles.streetName}>{pickupInfo.name.toUpperCase()}</Text>
        <Text style={{fontSize: 24, fontWeight: '400'}}>Collection on</Text>
        <Text style={{fontSize: 30, fontWeight: '500', color: '#291D29'}}>
          {dateAsString(pickupInfo.dateObject)}{' '}
        </Text>
        {renderSwitch(pickupInfo.binType)}
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => handlePickedDateNotification(pickupInfo)}>
          <Text style={styles.buttonTextColor}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={{paddingTop: 20}}
      horizontal
      snapToInterval={SCREEN_WIDTH}>
      <View>
        <DateTimePicker
          open={open}
          setOpen={setOpen}
          calendarDate={calendarDate}
        />
      </View>
      {pagesForNextMonths(dates).map(iDate => pageForIDate(iDate))}
    </ScrollView>
  );
};
export default Carousel;

const image = StyleSheet.create({
  imageSize: {
    height: SCREEN_HEIGHT * 0.25,
    width: SCREEN_WIDTH * 0.25,
  },
});
