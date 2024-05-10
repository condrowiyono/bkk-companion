import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

import {useAuth} from '../contexts/auth';

import History from '../screens/History';
import Home from '../screens/Home';
import Account from '../screens/Account';
import NeedAction from '../screens/NeedAction';

// Guest Only
import Info from '../screens/Info';

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

const InfoIcon = (props: TabBarIconType) => (
  <Icon name={props.focused ? 'compass' : 'compass-outline'} {...props} />
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {userID} = useAuth();

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
      {/*  userID > 0 mean internal user otherwise guest */}
      {Number(userID) > 0 && (
        <Tab.Screen
          name="NeedAction"
          component={NeedAction}
          options={{
            tabBarIcon: NeedActionIcon,
            headerTitle: 'Perlu Tindakan',
            tabBarLabel: 'Perlu Tindakan',
          }}
        />
      )}

      {Number(userID) > 0 && (
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: HistoryIcon,
            headerTitle: 'Riwayat',
            tabBarLabel: 'Riwayat',
          }}
        />
      )}

      {Number(userID) < 0 && (
        <Tab.Screen
          name="Info"
          component={Info}
          options={{
            tabBarIcon: InfoIcon,
            headerTitle: 'Info',
            tabBarLabel: 'Info',
          }}
        />
      )}

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
