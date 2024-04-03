import React, {useEffect, createContext, useState} from 'react';
import {
  check,
  requestPermission,
  checkToken,
  registerAppWithFCM,
} from '../libraries/firebase';
import {useAuth} from './auth';
import {fetcher} from '../utils/fetcher';

const FirebaseContext = createContext({});

export const FirebaseProvider = ({children}: {children: React.ReactNode}) => {
  const {userID} = useAuth();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetch = async () => {
      check(); //check firebase messaging permission
      requestPermission(); //request firebase messaging permission
      registerAppWithFCM(); //register app with firebase messaging
      const fcmToken = await checkToken(); //check firebase messaging token

      if (!userID) {
        return;
      }

      setToken(fcmToken);
      fetcher({
        url: '/register-device',
        method: 'POST',
        data: {
          fcm_token: fcmToken,
          employe_id: userID,
        },
      }).then(resp => {
        console.log('device registered', resp);
      });
    };

    fetch();
  }, [userID]);

  return (
    <FirebaseContext.Provider value={token}>
      {children}
    </FirebaseContext.Provider>
  );
};
