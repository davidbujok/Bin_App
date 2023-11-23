import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import {main, styles} from '../styles/stylesSheet';
import {getCurrentNotifications, handleNotification} from '../Components/NotificationFunctionality';
import {IDate} from '../styles/interfaces';
import DateTimePicker from '../Components/DateTimePicker';
import {
  binTypeToTile,
  capitaliseFirstLetter,
  clearEmptyCharacters,
} from '../Helpers/StringFunctions';
import RemindersScreen from '../Components/RemindersScreen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AddReminderModal from '../Components/AddReminderModal';
import DatePicker from 'react-native-date-picker';

const mixedbin = require('../static/images/mixedbin.png');
const glass = require('../static/images/bluebin.png');
const waste = require('../static/images/general.png');
const garden = require('../static/images/garden.png');
const food = require('../static/images/foodwaste.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Carousel = ({
  dates,
  streetName,
  hasReminders,
  setHasReminders,
  address,
}) => {
  const [open, setOpen] = useState(false);
  // const [calendarDate, setCalendarDate] = useState<IDate | null>(null);
  const [modalRemindersVisible, setModalRemindersVisible] = useState(false);
  const [pickupDayInfo, setPickupDayInfo] = useState<IDate | null>(null);
  const title: string = streetName.replace(/\s0\s/, ' ');

  const [updateNotifications, setUpdateNotifications] = useState<Boolean>(false);
  const [notificationsList, setNotificationsList] = useState<Array<Date> | null>([]);


  useEffect(() => {
    const fetchData = async () => {
      await getCurrentNotifications(notifications => {
        if (notifications.length > 0) {
          // setNotificationsList(notifications)
          const nextNotificationTime =
            notifications.length > 0 ? notifications : 'not setup';
          setNotificationsList(nextNotificationTime);
          setHasReminders(true);

          // setSwitch(true);
        } else {
          // setIsReminderEnabled(false);
          setNotificationsList([]);
        }
      });
    };
    fetchData();
    // End of getCurrentNotifications
  }, [updateNotifications]);


  useEffect(() => {
    if (Platform.OS === 'android') {
      PushNotification.getScheduledLocalNotifications(notifications => {
        if (notifications.length > 0) {
          setHasReminders(true);
        }
      });
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.getPendingNotificationRequests(notifications => {
        if (notifications.length > 0) {
          setHasReminders(true);
        }
      });
    }
  }, []);

  // const handlePickedDateNotification = (calendarDateObject: IDate) => {
  //   setCalendarDate(calendarDateObject);
  //   setOpen(true);
  // };

  const daySinceStartOfYear = () => {
    const year = new Date().getFullYear();

    const diffInMs = new Date().getTime() - new Date(`${year}-01-01`).getTime();
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
    const todayDaySinceStartOf2023 = daySinceStartOfYear();
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
        if (
          (daySinceStartOfYear() > 304 || daySinceStartOfYear() < 25) &&
          newDate.binType.includes('garden')
        ) {
          if (newDate.binType === 'garden') {
            continue;
          } else if (newDate.binType.includes('garden')) {
            const cloneOfClone = {...newDate};
            const currentBinTypes = cloneOfClone.binType;
            const updateCurrentBinTypes = clearEmptyCharacters(
              currentBinTypes.replace('garden', ''),
            );
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
            fontSize: RFPercentage(4),
            fontWeight: '600',
            color: '#291D29',
            paddingTop: SCREEN_HEIGHT * 0.05,
            textAlign: 'center',
          }}>
          {binTitle}
        </Text>
        <View style={{flexDirection: 'row', gap: RFPercentage(-9)}}>
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

  const pageForIDate = (pickupIDate: IDate) => {
    // const dateObject: Date = new Date(pickupInfo.date);

    return (
    <ScrollView
      showsVerticalScrollIndicator
        key={pickupIDate.id}
        >
      <View  style={swipeableStyle.container}>
        <Text
          style={{
            fontSize: RFPercentage(3.5),
            fontWeight: '600',
            color: '#291D29',
            flexWrap: 'wrap',
            marginLeft: SCREEN_WIDTH * 0.05,
            marginRight: SCREEN_WIDTH * 0.05,
            textAlign: 'center',
          }}>
          {dateAsString(pickupIDate.dateObject)}{' '}
        </Text>
        {renderSwitch(pickupIDate.binType)}
      </View>
      </ScrollView>
    );
  };

  const sanitisedDates = pagesForNextMonths(dates);
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  let previousDay: Date;

  if (pickupDayInfo != null) {
    previousDay = new Date(Number(pickupDayInfo.dateObject));
    previousDay.setDate(pickupDayInfo.dateObject.getDate() - 1);

    // previousDay = new Date(year, month, day, 21);
  } else {
    // emergency: yesterday
    previousDay = new Date(new Date().setDate(new Date().getDate() - 1));

  }


  
  return (
    <>
     <View> 
      <Text style={styles.streetName}>{title}</Text>
        <Swiper showsButtons={ true }
          style={{maxHeight: SCREEN_HEIGHT * 0.5}}
          showsPagination={ false }
          loop = {false}
          onIndexChanged = {(index) => {
          setSwiperIndex(index)
          }}
          index={0}   
        >
        {sanitisedDates.length > 0 ? (
          sanitisedDates.map(iDate => pageForIDate(iDate))
        ) : (
          <View style={swipeableStyle.verticalSwiper}>
            <Text
              style={{
                fontSize: RFPercentage(4),
                maxWidth: SCREEN_WIDTH * 0.8,
              }}>
              Garden bins are not collected from November to January for{' '}
              {streetName.replace(/\s0\s/, ' ')}
            </Text>
          </View>
        )}
      </Swiper>
      <TouchableOpacity
        style={[ swipeableStyle.button, {alignSelf: 'center' }]}
        onPress={() => {
          setOpenDateTimePicker(true);
          setPickupDayInfo(sanitisedDates[swiperIndex]);
          // setModalRemindersVisible(true);
        }}>
        <Text style={styles.buttonTextColor} maxFontSizeMultiplier={1.3}>
          Add Reminder
        </Text>
      </TouchableOpacity>
      </View>
       <View>
        <DateTimePicker
          open={openDateTimePicker}
          setOpen={setOpenDateTimePicker}
          calendarDate={sanitisedDates[swiperIndex]}
          datePicked={async reminderTime => {
            await handleNotification(sanitisedDates[swiperIndex], new Date(reminderTime));
            await setUpdateNotifications(!updateNotifications);
          }}
        />
      </View>
      <AddReminderModal
      setOpenDateTimePicker={setOpenDateTimePicker}
      modalRemindersVisible = {modalRemindersVisible}
      setModalRemindersVisible = {setModalRemindersVisible}
      pickupDayInfo = {pickupDayInfo}
      pagesForNextMonths = {pagesForNextMonths}
      setHasReminders = {setHasReminders}
      dates = {dates}
      openDateTimePicker = {openDateTimePicker} />
      </>
  );
};
export default Carousel;

const image = StyleSheet.create({
  imageSize: {
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.3,
  },
});

const swipeableStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1c6fc4',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.02,
    padding: SCREEN_WIDTH * 0.02,
  },
  verticalSwiper: {
    display: 'flex',
    flex: 1,
    maxWidth: SCREEN_WIDTH,
  },
});
