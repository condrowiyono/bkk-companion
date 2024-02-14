import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {useAuth} from '../contexts/auth';
import Login from '../screens/Login';
import TabNavigator from './tab';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import TaskDetail from '../screens/TaskDetail';
import {StackList} from './types';

const Stack = createNativeStackNavigator<StackList>();

const StackNavigator = () => {
  const {isLoading, isAuthentiacated} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthentiacated ? (
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{headerShown: false}}
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
    </NavigationContainer>
  );
};

export default StackNavigator;
