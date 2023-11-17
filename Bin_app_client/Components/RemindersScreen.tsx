import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {styles} from '../styles/stylesSheet';
import {IDate} from '../styles/interfaces';
import DateTimePicker from './DateTimePicker';
import {
  cancelNotifications,
  getCurrentNotifications,
  handleNotification,
} from './NotificationFunctionality';
import {dateToString} from '../Helpers/StringFunctions';
import {months, weekday} from '../Helpers/ConstantVariables';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RemindersScreen = ({date, datesList, setHasReminders}) => {
  const [open, setOpen] = useState(false);
  // console.log("DATES Before Const: ",dates)

  const [calendarDate, setCalendarDate] = useState<IDate>(date);
  const [nextNotificationTime, setNextNotificationTime] = useState<String>('');
  const [notificationsList, setNotificationsList] =
    useState<Array<Date> | null>([]);
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [updateNotifications, setUpdateNotifications] =
    useState<Boolean>(false);

  // console.log('DATES After const: ', date);

  const toggleSwitch = () => {
    const newValue = !isReminderEnabled;
    setIsReminderEnabled(newValue);
  };

  // ===========================================================================
  // THIS HAS TO RUN ON EVERY REMINDERS UPDATE

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
          setNextNotificationTime('');
          // setIsReminderEnabled(false);
          setNotificationsList([]);
        }
      });
    };
    fetchData();
    // End of getCurrentNotifications
  }, [updateNotifications]);
  // ===========================================================================

  // console.log(datesList[datesList.length - 1].dateObject.toString());
  const lastCollectionDate = datesList[datesList.length - 1].dateObject;
  const lastCollectionObj = dateToString(lastCollectionDate);
  const lastCollection = `${weekday[lastCollectionObj.dayOfWeek]}, ${
    months[lastCollectionObj.month]
  } ${lastCollectionObj.day}, ${lastCollectionObj.year}`;
  return (
    <View>
      {/* KEEP ALL CODE BELOW */}

      {/* <View style={styles.rowContainer}>
        <Text style={styles.streetName}>
          Repeat until {'\n'}
          {lastCollection}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#1c6fc4'}}
          thumbColor={isReminderEnabled ? '#6aa62e' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
          onChange={() => {
            setUpdateNotifications(!updateNotifications);
          }}
        />
      </View> */}
    

      <View
        style={[
          styles.rowContainer,
          {display: 'flex', alignContent: 'center', justifyContent: 'center'},
        ]}>

        {isReminderEnabled == true ? (
          <Text>Here</Text>
        ) : (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {
              setOpen(true);
            }}>
            <Text style={[styles.buttonTextColor]} maxFontSizeMultiplier={1.3}>Set Time</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <DateTimePicker
          open={open}
          setOpen={setOpen}
          calendarDate={calendarDate}
          datePicked={async reminderTime => {
            console.log('Cla day Reminder : ', calendarDate);

            await setNextNotificationTime(
              new Date(reminderTime).toLocaleString(),
            );
            await handleNotification(calendarDate, new Date(reminderTime));

            await setUpdateNotifications(!updateNotifications);
          }}
        />
      </View>
    </View>
  );
};
export default RemindersScreen;
