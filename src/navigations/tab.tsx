import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import History from '../screens/History';
import Home from '../screens/Home';

type TabBarIconType = {
  focused: boolean;
  color: string;
  size: number;
};

const AccountScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
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
        component={AccountScreen}
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
