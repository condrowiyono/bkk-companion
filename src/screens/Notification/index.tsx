import React from 'react';
import {useAuth} from '../../contexts/auth';
import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import type {Notification} from '../../interfaces/notification';
import {FlatList, RefreshControl} from 'react-native';
import Item from './components/Item';
import Empty from '../../components/Empty';
import ListHeader from '../../components/ListHeader';
import ListFooter from '../../components/ListFooter';
import {formatDate} from '../../utils/date';

const NotificationScreen = () => {
  const {userID} = useAuth();

  const {
    data,
    isFetchedAfterMount,
    isFetching,
    dataUpdatedAt,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['notifications', userID],
    queryFn: () => fetcher<Notification[]>({url: '/protected/notifications'}),
  });

  return (
    <FlatList
      keyExtractor={item => `${item.id}`}
      data={data?.data}
      ListEmptyComponent={!isFetching ? <Empty /> : null}
      refreshControl={
        <RefreshControl
          refreshing={isFetchedAfterMount && isFetching}
          onRefresh={refetch}
        />
      }
      renderItem={({item, index}) => <Item index={index} item={item} />}
      ListHeaderComponent={<ListHeader show={isFetching} />}
      ListFooterComponent={
        <ListFooter
          title={`Data diperbarui pada: ${formatDate(dataUpdatedAt)}`}
          show={isSuccess}
        />
      }
    />
  );
};

export default NotificationScreen;
