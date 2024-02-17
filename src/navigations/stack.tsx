import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {useAuth} from '../contexts/auth';
import Login from '../screens/Login';
import TabNavigator from './tab';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import TaskDetail from '../screens/TaskDetail';
import {StackList} from './types';
import {Colors} from 'react-native-ui-lib';

const Stack = createNativeStackNavigator<StackList>();

const StackNavigator = () => {
  const {isLoading, isAuthentiacated} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.$backgroundDefault},
      }}>
      {isAuthentiacated ? (
        <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={({route}) => ({
              headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Beranda',
            })}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
            options={{title: 'Rincian'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
