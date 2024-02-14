import * as React from 'react';
import {AppState, Platform, AppStateStatus, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager} from '@tanstack/react-query';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import ReactQueryProvider from './src/contexts/react-query';
import StackNavigator from './src/navigations/stack';
import {ToastProvider} from './src/contexts/toast';
import {AuthProvider} from './src/contexts/auth';

import {configureDesignSystem} from './src/themes/config';

import './src/libraries/net-info';
import './src/libraries/dayjs';

configureDesignSystem();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

function App() {
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={style.container}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <AuthProvider>
            <ToastProvider>
              <ReactQueryProvider>
                <StackNavigator />
              </ReactQueryProvider>
            </ToastProvider>
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
