import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
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

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
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

export default TabNavigator;