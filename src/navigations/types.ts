import type {BottomTabNavigationProp as TabNavProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp as StackNavProp} from '@react-navigation/native-stack';
import type {CompositeNavigationProp} from '@react-navigation/native';

export type StackList = {
  Login: undefined;
  Onboarding: undefined;
  TabNavigator: {screen?: string; tabId?: number} | undefined;
  NeedAction: undefined;
  History: undefined;
  Account: undefined;
  ProjectDetail: {taskId: string};
  PurchaseOrderDetail: {taskId: string};
  SplashScreen: undefined;
  NeedActionSearch: undefined;
  HistorySearch: undefined;
  Profile: undefined;
};

export type StackNavScreen = Omit<StackList, 'TabNavigator'>;

export type NavigationProp = CompositeNavigationProp<
  StackNavProp<StackNavScreen>,
  TabNavProp<StackList, 'TabNavigator'>
>;
