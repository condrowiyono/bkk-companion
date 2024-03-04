import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

import History from '../screens/History';
import Home from '../screens/Home';
import Account from '../screens/Account';
import NeedAction from '../screens/NeedAction';

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

const NeedActionIcon = (props: TabBarIconType) => (
  <Icon name={props.focused ? 'ticket' : 'ticket-outline'} {...props} />
);

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
        name="NeedAction"
        component={NeedAction}
        options={{
          tabBarIcon: NeedActionIcon,
          headerTitle: 'Perlu Tindakan',
          tabBarLabel: 'Perlu Tindakan',
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
