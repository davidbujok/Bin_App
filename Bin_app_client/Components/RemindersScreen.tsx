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
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const RemindersScreen = ({dates, streetName, setHasReminders}) => {
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<IDate>(
    dates && dates.length > 0 ? dates[0] : null,
  );
  const [nextNotificationTime, setNextNotificationTime] = useState<String>('');
  const [notifcationsList, setNotificationsList] = useState<Array<Date> | null>([])
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
      setHasReminders(false)
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
        setNotificationsList(notifications)
        const nextNotificationTime =
          notifications.length > 0
            // ? new Date(notifications[0].date).toLocaleString()
            ? notifications
            : 'not setup';
        // setNextNotificationTime(nextNotificationTime);
        
        // setSwitch(true);
        setIsReminderEnabled(true)
      } else {
        setNextNotificationTime('');
        setIsReminderEnabled(false)
      }
    });
  }, []);

  return (
    <View>
      {/* <View style={styles.rowContainer}>
        <Text style={styles.streetName}>{'Street:' + streetName}</Text>
      </View> */}

      <View style={styles.rowContainer}>
        <Text style={styles.streetName}>Enable Reminders:</Text>
        <Switch
          trackColor={{false: '#767577', true: "#1c6fc4"}}
          thumbColor={isReminderEnabled ? "#6aa62e" : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
        />
      </View>
       
        <Text style={{textAlign:'center', paddingTop: SCREEN_HEIGHT * 0.01}}>
        {notifcationsList && notifcationsList.length > 0 ?<>
        Reminders Set: {notifcationsList.length}
        </>
      : <>No reminders set</>}
      </Text>
    
      <View style={[styles.rowContainer, {display: 'flex',alignContent: 'center', justifyContent:'center'}]}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={[styles.buttonTextColor] }>
           Add Reminder
          </Text>
                {/* // notifcationsList.map((notification) => { */}
                
                {/* // <Text>{notification.date.getDate() && notification.length }</Text>
                // // console.log(Object.getOwnPropertyNames(notification) + "LOG NOTIFICATION" );
                // // console.log('====================================');
                // console.log(notification.date.toString() + "notifcation.date");
                // // console.log('====================================');
                // // // console.log(notification.getDate() )

              // }) */}
              
        </TouchableOpacity>
        {/* {console.log(notifcationsList)} */}
      </View>

      <View>
        <DateTimePicker
          open={open}
          setOpen={setOpen}
          calendarDate={calendarDate}
          datePicked={reminderTime => {
            setIsReminderEnabled(true);
            setNextNotificationTime(new Date(reminderTime).toLocaleString());
            handleNotification(calendarDate, new Date(reminderTime));
          }}
        />
      </View>
    </View>
  );
};
export default RemindersScreen;
