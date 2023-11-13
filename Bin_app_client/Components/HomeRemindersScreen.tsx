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

import {styles} from '../styles/stylesSheet';
import {
  cancelNotifications,
  getCurrentNotifications,
} from './NotificationFunctionality';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function HomeRemindersScreen() {
  const [notificationsList, setNotificationsList] =
    useState<Array<Date> | null>([]);
  const [updateNotifications, setUpdateNotifications] =
    useState<Boolean>(false);

  console.log(notificationsList[0]);
  // ===========================================================================
  // THIS HAS TO RUN ON EVERY REMINDERS UPDATE

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentNotifications(notifications => {
        if (notifications.length > 0) {
          const listOfNotifications =
            notifications.length > 0 ? notifications : 'not setup';
          setNotificationsList(listOfNotifications);
        } else {
          setNotificationsList([]);
        }
      });
    };
    fetchData();
  }, [updateNotifications]);
  // ===========================================================================

  return (
    <View>
      {/* <View style={styles.rowContainer}>
          <Text style={styles.streetName}>{'Street:' + streetName}</Text>
        </View> */}
      {/* {new Date(reminder.date).toString()} */}

      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.smallButton, {backgroundColor: 'red'}]}
          onPress={async () => {
            await cancelNotifications();
            await setUpdateNotifications(!updateNotifications);
          }}>
          <Text style={[styles.buttonTextColor]}>Delete Reminders</Text>
        </TouchableOpacity>
      </View>

      {notificationsList && notificationsList.length > 0 ? (
        <View>
          {notificationsList.map((reminder: any) => {
            return <Text>{reminder.message}</Text>;
          })}
        </View>
      ) : (
        <Text style={{textAlign: 'center', paddingTop: SCREEN_HEIGHT * 0.01}}>
          No Reminders
        </Text>
      )}

      <View
        style={[
          styles.rowContainer,
          {display: 'flex', alignContent: 'center', justifyContent: 'center'},
        ]}></View>
    </View>
  );
}

export default HomeRemindersScreen;
