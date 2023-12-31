import PushNotification from 'react-native-push-notification';
import checkApplicationPermission from '../Containers/NotificationPermission';
import {IDate} from '../styles/interfaces';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const handleNotification = async (date: IDate, pickedDate: Date) => {
  console.log(
    'Hours',
    pickedDate.getHours(),
    'minutes: ',
    pickedDate.getMinutes(),
  );

  await checkApplicationPermission();

  const year: number = pickedDate.getFullYear();
  const month: number = pickedDate.getMonth();
  const day: number = pickedDate.getDate();
  const hour: number = pickedDate.getHours();
  const minute: number = pickedDate.getMinutes();

  //Actual Variable (Need hour - minute variable)
  const setNotification = new Date(year, month, day, hour, minute);

  console.log('SET NOTIFICATION FOR :', setNotification, date);
  //   console.log('year :', year);
  //   console.log('month: ', month);
  //   console.log('day :', day);
  //   console.log('hour :', hour);
  //   console.log('minutes :', minute);


  console.log(date.date)
  console.log(setNotification + "SET NOTIFICATIONS --------------------")
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const dateToDisplay = `${weekday[setNotification.getDay()]} ${setNotification.getDate()}-${setNotification.getMonth()}-${setNotification.getFullYear()}`
  if (Platform.OS === 'android') {
    PushNotification.localNotification({
      channelId: 'Date-Notification',
      title: 'Which Bin',
      message: `Congratulations, you have set up a reminder for your bin on ${dateToDisplay} `,
    });
    PushNotification.localNotificationSchedule({
      channelId: 'Date-Notification',
      title: `Which Bin`,
      message: `Your ${date.binType} collection is on ${dateToDisplay}`,
      date: setNotification,
      allowWhileIdle: true,
    });
    PushNotification.getScheduledLocalNotifications(notifications => {
      console.log('android setup notification', notifications);
    });
  } else if (Platform.OS == 'ios') {
    PushNotificationIOS.addNotificationRequest({
      id: 'Date-Notification',
      title: `Which Bin`,
      body: `Your ${date.binType} collection is on ${dateToDisplay}`,
      fireDate: new Date(Date.now() + 1 * 1000), // Schedule in 1 secs
    });
    PushNotificationIOS.addNotificationRequest({
      id: 'Date-Notification',
      title: `Which Bin`,
      body: `Your ${date.binType} collection is on ${dateToDisplay}`,
      fireDate: setNotification,
    });
    PushNotificationIOS.getPendingNotificationRequests(Localarray => {
      console.log('ios setup notification', Localarray);
    });
  }
};

export const getCurrentNotifications = async callback => {
  if (Platform.OS === 'android') {
    PushNotification.getScheduledLocalNotifications(notifications => {
      console.log('android setup notification', notifications);
      callback(notifications);
    });
  } else if (Platform.OS == 'ios') {
    PushNotificationIOS.getPendingNotificationRequests(notifications => {
      console.log('ios setup notification', notifications);
      callback(notifications);
    });
  }
};

export const cancelNotifications = () => {
  if (Platform.OS === 'android') {
    PushNotification.cancelAllLocalNotifications();
  } else if (Platform.OS == 'ios') {
    PushNotificationIOS.removeAllPendingNotificationRequests();
  }
};
