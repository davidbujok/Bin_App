import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }
  };

export default checkApplicationPermission;