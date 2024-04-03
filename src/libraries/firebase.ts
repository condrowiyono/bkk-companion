import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export const check = async () => {
  if (Platform.OS === 'ios') return Promise.resolve(true);

  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    Promise.resolve(true);
  } catch (error) {
    Promise.reject(error);
  }
};

export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) console.log('Authorization status:', authStatus);
};

export const checkToken = async () => {
  // await messaging().registerDeviceForRemoteMessages();
  // cherk permission
  let fcmToken = '';
  const enabled = await messaging().hasPermission();

  if (enabled) {
    try {
      const token = await messaging().getToken();
      if (token) {
        fcmToken = token;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return fcmToken;
};

export async function registerAppWithFCM() {}
