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
  deleteReminderById,
  getCurrentNotifications,
} from './NotificationFunctionality';
import {homeReminderModalMessage} from '../Helpers/StringFunctions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function HomeRemindersScreen() {
  const [notificationsList, setNotificationsList] =
    useState<Array<Date> | null>([]);
  const [updateNotifications, setUpdateNotifications] =
    useState<Boolean>(false);

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
      {notificationsList && notificationsList.length > 0 ? (
        <View style={{display: 'flex', gap: 6}}>
          {notificationsList.map((reminder: any) => {
            const message = homeReminderModalMessage(reminder.message);
            return (
              <>
                <View
                  id={reminder.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      flexGrow: 9,
                    }}>
                    {message}
                  </Text>
                  <Pressable
                    style={{alignSelf: 'center'}}
                    onPress={async () => {
                      await deleteReminderById(reminder.id);
                      await setUpdateNotifications(!updateNotifications);
                    }}>
                    <Image
                      //   style={{}}
                      source={require('../static/images/delete.png')}></Image>
                  </Pressable>
                </View>
              </>
            );
          })}
        </View>
      ) : (
        <Text style={{textAlign: 'center', paddingTop: SCREEN_HEIGHT * 0.01}}>
          No Reminders
        </Text>
      )}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.smallButton, {backgroundColor: 'red'}]}
          onPress={async () => {
            await cancelNotifications();
            await setUpdateNotifications(!updateNotifications);
          }}>
          <Text style={[styles.buttonTextColor]}>Delete All</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.rowContainer,
          {display: 'flex', alignContent: 'center', justifyContent: 'center'},
        ]}></View>
    </View>
  );
}

export default HomeRemindersScreen;
