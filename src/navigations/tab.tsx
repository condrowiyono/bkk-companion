import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

import History from '../screens/History';
import Home from '../screens/Home';
import Account from '../screens/Account';

type TabBarIconType = {
  focused: boolean;
  color: string;
  size: number;
};

const HomeIcon = (props: TabBarIconType) => (
  <Icon name={props.focused ? 'home' : 'home-outline'} {...props} />
);

const AccountIcon = (props: TabBarIconType) => (
  <Icon name={props.focused ? 'person' : 'person-outline'} {...props} />
);

const HistoryIcon = (props: TabBarIconType) => (
  <Icon
    name={props.focused ? 'document-text' : 'document-text-outline'}
    {...props}
  />
);

const tabMapping = {
  Home: 'Beranda',
  History: 'Riwayat',
  Account: 'Akun',
};

const getScreenTitle = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return tabMapping.Home;
    case 'History':
      return tabMapping.History;
    case 'Account':
      return tabMapping.Account;
    default:
      return tabMapping.Home;
  }
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      sceneContainerStyle={{backgroundColor: Colors.$backgroundDefault}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Beranda',
          tabBarLabel: 'Beranda',
          tabBarIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: HistoryIcon,
          headerTitle: 'Riwayat',
          tabBarLabel: 'Riwayat',
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: AccountIcon,
          headerTitle: 'Akun',
          tabBarLabel: 'Akun',
        }}
      />
    </Tab.Navigator>
  );
};

export {getScreenTitle};
export default TabNavigator;
