import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Colors} from 'react-native-ui-lib';

import {useAuth} from '../contexts/auth';
import Login from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import ProjectDetail from '../screens/ProjectDetail';
import Profile from '../screens/Profile';
import PreOrderDetail from '../screens/PreOrderDetail';
import NeedActionSearch from '../screens/NeedActionSearch';
import HistorySearch from '../screens/HistorySearch';

import {StackList} from './types';
import TabNavigator from './tab';
import SearchIcon from './components/SearchIcon';

const Stack = createNativeStackNavigator<StackList>();

const renderSearch = (routeName: string, props: HeaderButtonProps) => {
  switch (routeName) {
    case 'History':
      return <SearchIcon screen="HistorySearch" {...props} />;
    case 'NeedAction':
      return <SearchIcon screen="NeedActionSearch" {...props} />;
    default:
      return null;
  }
};

const renderScreenTitle = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'Beranda';
    case 'NeedAction':
      return 'Perlu Tindakan';
    case 'History':
      return 'Riwayat';
    case 'Account':
      return 'Akun';
    default:
      return 'Beranda';
  }
};

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
              headerShadowVisible: false,
              headerTitle: renderScreenTitle(
                getFocusedRouteNameFromRoute(route) ?? 'Home',
              ),
              headerRight: props =>
                renderSearch(
                  getFocusedRouteNameFromRoute(route) ?? 'Home',
                  props,
                ),
            })}
          />
          <Stack.Screen
            name="ProjectDetail"
            component={ProjectDetail}
            options={{title: 'Rincian Budget', headerBackTitleVisible: false}}
          />
          <Stack.Screen
            name="PreOrderDetail"
            component={PreOrderDetail}
            options={{title: 'Rincian PO', headerBackTitleVisible: false}}
          />
          <Stack.Screen
            name="NeedActionSearch"
            component={NeedActionSearch}
            options={{title: 'Pencarian', headerBackTitleVisible: false}}
          />
          <Stack.Screen
            name="HistorySearch"
            component={HistorySearch}
            options={{title: 'Pencarian', headerBackTitleVisible: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Profil',
              headerBackTitleVisible: false,
              headerShadowVisible: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
