import React, {useEffect, useState} from 'react';

import {
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {styles} from '../styles/stylesSheet';
// import {handleNotification} from '../Components/NotificationFunctionality';
import {IDate} from '../styles/interfaces';
import DateTimePicker from './DateTimePicker';
import {
  cancelNotifications,
  getCurrentNotifications,
  handleNotification,
} from './NotificationFunctionality';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const RemindersScreen = ({dates, streetName}) => {
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<IDate>(
    dates && dates.length > 0 ? dates[0] : null,
  );
  const [nextNotificationTime, setNextNotificationTime] = useState<String>('');
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  useEffect(() => {
    const newIDate = dates && dates.length > 0 ? dates[0] : null;
    console.log('setCalendarDate', newIDate);
    setCalendarDate(newIDate);
  }, [dates]);

  const toggleSwitch = () => {
    console.log('toggleSwitch', dates, nextNotificationTime);
    const newValue = !isReminderEnabled;
    setSwitch(newValue);
  };

  const setSwitch = newValue => {
    console.log('setSwitch', newValue, nextNotificationTime, '!');

    if (newValue) {
      //re-set reminder
      if (nextNotificationTime === '') {
        setOpen(true);
        console.log('setOpen(true)');
      }
    } else {
      //cancel reminders
      setNextNotificationTime('');
      cancelNotifications();
    }

    setIsReminderEnabled(newValue);
  };

  //   const handlePickedDateNotification = (calendarDateObject: IDate) => {
  //     console.log('handlePickedDateNotification');

  //     setCalendarDate(calendarDateObject);
  //     setOpen(true);
  //   };

  useEffect(() => {
    getCurrentNotifications(notifications => {
      // const notificationsStrings = notifications.
      console.log('notifications', notifications);
      if (notifications.length > 0) {
        const nextNotificationTime =
          notifications.length > 0
            ? new Date(notifications[0].date).toLocaleString()
            : 'not setup';
        setNextNotificationTime(nextNotificationTime);
        setSwitch(true);
      } else {
        setNextNotificationTime('');
        setSwitch(false);
      }
    });
  }, []);

  return (
    <View>
      <View style={styles.rowContainer}>
        <Text style={styles.streetName}>Reminder Settings</Text>
        <Text style={styles.icon}>⏰</Text>
      </View>
      {/* <View style={styles.rowContainer}>
        <Text style={styles.streetName}>{'Street:' + streetName}</Text>
      </View> */}

      <View style={styles.rowContainer}>
        <Text style={styles.streetName}>Enable Reminders:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isReminderEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
        />
      </View>
      <View style={styles.rowContainer}>
        <Pressable
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={styles.streetName}>Change reminder Time:</Text>
          <Text style={styles.streetName}>
            {nextNotificationTime && nextNotificationTime !== ''
              ? nextNotificationTime
              : 'no reminder set'}
          </Text>
        </Pressable>
      </View>

      <View>
        <DateTimePicker
          open={open}
          setOpen={setOpen}
          calendarDate={calendarDate}
          datePicked={reminderTime => {
            setIsReminderEnabled(true);
            setNextNotificationTime(new Date(reminderTime).toLocaleString());
            // handleNotification(calendarDate, reminderTime);
          }}
        />
      </View>
    </View>
  );
};
export default RemindersScreen;
