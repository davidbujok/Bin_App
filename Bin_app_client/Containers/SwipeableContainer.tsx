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
import {main, styles} from '../styles/stylesSheet';
import {handleNotification} from '../Components/NotificationFunctionality';
import {IDate} from '../styles/interfaces';
import DateTimePicker from '../Components/DateTimePicker';
import {capitaliseFirstLetter} from '../Helpers/StringFunctions';

const mixedbin = require('../static/images/mixedbin.png');
const glass = require('../static/images/bluebin.png');
const waste = require('../static/images/general.png');
const garden = require('../static/images/garden.png');
const food = require('../static/images/foodwaste.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Carousel = ({dates, streetName, setModalRemindersVisible}) => {
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

  const removeDuplicates = results => {
    for (let date: number = 0; date < results.length - 1; date++) {
      if (
        results[date].dateObject.getTime() ===
        results[date + 1].dateObject.getTime()
      ) {
        results[date].binType += ' ' + results[date + 1].binType;
        // console.log('Duplicate found')
        results.splice(date + 1, 1);
      }
      // console.log("What number", date)
      // console.log("What number", results.length)
    }
    return results;
  };

  const pagesForNextMonths = (iDates: Array<IDate>, fortnights = 4) => {
    const result: Array<IDate> = [];
    if (!iDates) {
      return [];
    }
    const todayDaySinceStartOf2023 = daySinceStartOf2023();
    let weeksSkipped = Math.floor(todayDaySinceStartOf2023 / 7);

    // if(iDates[0].binType.includes('garden') == false){
    if (iDates[0].dateObject.getDay() < todayDaySinceStartOf2023 % 7) {
      // this week we missed it, skip another week. eg today is Wednesday (2)
      weeksSkipped += 1;
    }

    // 1,      15,      29
    // 1 (+8), 15 (+22),29
    iDates.forEach(iDateToClone => {
      for (let fortnight = 0; fortnight < fortnights; fortnight++) {
        //  here create a new idate so you can add it
        // 14 * fortnight + weeksSkipped * 7
        // if it's food, create two of them one 7 days later
        const newDate = createNewIDateXDaysLater(
          iDateToClone,
          14 * fortnight + weeksSkipped * 7,
        );
        if (daySinceStartOf2023() > 304 && newDate.binType.includes('garden')) {
          if (newDate.binType === 'garden') {
            continue;
          } else if (newDate.binType.includes('garden')) {
            const cloneOfClone = {...newDate};
            const currentBinTypes = cloneOfClone.binType;
            const updateCurrentBinTypes = currentBinTypes.replace('garden', '');
            cloneOfClone.binType = updateCurrentBinTypes.trim();
            result.push(cloneOfClone);
          }
        } else {
          result.push(newDate);
        }
        // console.log("This is binType :",iDateToClone.binType)
        if (iDateToClone.binType.includes('food')) {
          const cloneOfClone = {...iDateToClone};
          cloneOfClone.binType = 'food';
          const newDateFood = createNewIDateXDaysLater(
            cloneOfClone,
            14 * fortnight + weeksSkipped * 7 + 7,
          );
          result.push(newDateFood);
        }
      }
    });
    result.sort((date1, date2) => date1.id - date2.id); //sort by date (id)
    // return result
    return removeDuplicates(result);
  };

  const createNewIDateXDaysLater = (iDate, thisManyDaysLater) => {
    const newDate = {...iDate};
    newDate.dateObject = new Date(Number(iDate.dateObject)); //clone the date
    newDate.dateObject.setDate(iDate.dateObject.getDate() + thisManyDaysLater);
    newDate.id = newDate.dateObject.getTime() + thisManyDaysLater;
    return newDate;
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
      food: food,
    };
    return (
      <Image
        resizeMode="contain"
        style={image.imageSize}
        source={resources[binName]}></Image>
    );
  };
  const binTypeToTile = binTypes => {
    let binNames = binTypes.split(' ');
    // binNames.sort().reverse()
    binNames = capitaliseFirstLetter(binNames);

    if (binNames.length > 3) {
      binNames.sort().reverse().pop();
    }

    // if (binNames.length === 4) {
    //   return `${binNames[0]}, ${binNames[1]} & ${binNames[2]}`
    // }
    if (binNames.length === 3) {
      return `${binNames[0]}, ${binNames[1]} & ${binNames[2]}`;
    }
    if (binNames.length === 2) {
      return `${binNames[0]} & ${binNames[1]}`;
    }
    if (binNames.length === 1) {
      return `${binNames[0]}`;
    }
  };

  const imagesForWasteType = (binTypes: string) => {
    const binNames = binTypes.split(' ');
    if (binNames.length > 3) {
      binNames.sort().reverse().pop();
    }
    const binTitle = binTypeToTile(binTypes);
    return (
      <>
        <Text
          style={{
            fontSize: SCREEN_WIDTH * 0.075,
            fontWeight: '600',
            color: '#291D29',
            paddingTop: SCREEN_HEIGHT * 0.06,
          }}>
          {binTitle}
        </Text>
        <View style={{flexDirection: 'row', gap: -SCREEN_WIDTH * 0.075}}>
          {binNameToImage(binNames[0])}
          {binNames.length > 1 ? binNameToImage(binNames[1]) : null}
          {binNames.length > 2 ? binNameToImage(binNames[2]) : null}
          {binNames.length > 3 ? binNameToImage(binNames[3]) : null}
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
    const title: string = pickupInfo.name.toUpperCase().replace(/\s0\s/, ' ');
    return (
      <View
        key={pickupInfo.id}
        style={{
          width: SCREEN_WIDTH,
          alignItems: 'center',
          paddingTop: SCREEN_HEIGHT * 0.03,
        }}>
        <Text style={styles.streetName}>{title}</Text>
        <Text
          style={{
            fontSize: SCREEN_WIDTH * 0.07,
            fontWeight: '400',
            marginTop: SCREEN_HEIGHT * 0.05,
          }}>
          Next collection is:
        </Text>
        <Text
          style={{
            fontSize: SCREEN_WIDTH * 0.08,
            fontWeight: '500',
            color: '#291D29',
          }}>
          {dateAsString(pickupInfo.dateObject)}{' '}
        </Text>
        {renderSwitch(pickupInfo.binType)}
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setModalRemindersVisible(true)}>
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
      {/* <View>
        <DateTimePicker
          open={open}
          setOpen={setOpen}
          calendarDate={calendarDate}
        />
      </View> */}
      {pagesForNextMonths(dates).length > 0 ? (
        pagesForNextMonths(dates).map(iDate => pageForIDate(iDate))
      ) : (
        <View style={main.container}>
          <Text
            style={{
              fontSize: SCREEN_WIDTH * 0.08,
              maxWidth: SCREEN_WIDTH * 0.65,
            }}>
            Garden bins are not collected from November to January for{' '}
            {streetName.replace(/\s0\s/, ' ')}
          </Text>
        </View>
      )}
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
