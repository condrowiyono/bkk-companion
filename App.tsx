import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';

import ReactQueryProvider from './src/contexts/react-query';
import StackNavigator from './src/navigations/stack';
import {AuthProvider} from './src/contexts/auth';

import {configureDesignSystem} from './src/themes/config';

import './src/libraries/net-info';
import './src/libraries/dayjs';
import './src/libraries/atob';
import Toast from 'react-native-toast-message';

configureDesignSystem();

function App() {
  return (
    <GestureHandlerRootView style={style.container}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <AuthProvider>
            <ReactQueryProvider>
              <NavigationContainer>
                <StackNavigator />
                <Toast position="bottom" />
              </NavigationContainer>
            </ReactQueryProvider>
          </AuthProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
