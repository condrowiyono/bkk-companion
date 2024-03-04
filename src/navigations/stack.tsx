import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

import {PressableScale} from '../components/PressableScale';
import {useAuth} from '../contexts/auth';
import Login from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import ProjectDetail from '../screens/ProjectDetail';
import Search from '../screens/Search';
import Profile from '../screens/Profile';

import TabNavigator from './tab';
import {NavigationProp, StackList} from './types';

const Stack = createNativeStackNavigator<StackList>();

const SearchIcon = (props: HeaderButtonProps) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <PressableScale onPress={() => navigation.navigate('Search')}>
      <Icon name="search" size={24} {...props} />
    </PressableScale>
  );
};

const renderSearch = (routeName: string, props: HeaderButtonProps) => {
  switch (routeName) {
    case 'History':
    case 'NeedAction':
      return <SearchIcon {...props} />;
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
              headerRight: props =>
                renderSearch(
                  getFocusedRouteNameFromRoute(route) ?? 'Home',
                  props,
                ),
              headerTitle: renderScreenTitle(
                getFocusedRouteNameFromRoute(route) ?? 'Home',
              ),
            })}
          />
          <Stack.Screen
            name="TaskDetail"
            component={ProjectDetail}
            options={{title: 'Rincian Budget'}}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{title: 'Pencarian'}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{title: 'Profil'}}
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
            options={{headerBackTitleVisible: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
