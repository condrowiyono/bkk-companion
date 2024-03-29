import React, {useEffect} from 'react';
import {AppState, Platform, AppStateStatus} from 'react-native';
import {QueryCache, QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {focusManager} from '@tanstack/react-query';

import OfflineNotice from '../components/OfflineNotice';

const persister = createAsyncStoragePersister({storage: AsyncStorage});
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => console.log('query-client', error),
  }),
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const ReactQueryProvider = ({children}: {children: React.ReactNode}) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister}}>
      <>
        <OfflineNotice />
        {children}
      </>
    </PersistQueryClientProvider>
  );
};

export default ReactQueryProvider;
