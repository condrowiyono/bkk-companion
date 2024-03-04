import React, {useMemo} from 'react';
import {QueryCache, QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const ReactQueryProvider = ({children}: {children: React.ReactNode}) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: error =>
            Toast.show({
              type: 'error',
              text1: `Gagal mendapatkan data: ${error.message}`,
              visibilityTime: 3000,
            }),
        }),
      }),
    [],
  );

  const persister = useMemo(
    () => createAsyncStoragePersister({storage: AsyncStorage}),
    [],
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister}}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default ReactQueryProvider;
