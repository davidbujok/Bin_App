import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {PermissionsAndroid, Platform} from 'react-native';

const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {}
  } else if (Platform.OS == 'ios') {
    console.log('    PushNotificationIOS.requestPermissions');
    await PushNotificationIOS.requestPermissions();
  }
};

export default checkApplicationPermission;
