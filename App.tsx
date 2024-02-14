import * as React from 'react';
import {AppState, Platform, AppStateStatus} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import StackNavigator from './src/navigations/stack';
import {queryClient, persister} from './src/libraries/react-query';
import './src/libraries/net-info';
import './src/libraries/dayjs';

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
    <GestureHandlerRootView style={{flex: 1}}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister}}>
        <SafeAreaProvider>
          <StackNavigator />
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
