import React, {useRef} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import Empty from '../../components/Empty';
import ListHeader from '../../components/ListHeader';
import ListFooter from '../../components/ListFooter';
import {PreOrder} from '../../interfaces/preOrder';
import {NavigationProp} from '../../navigations/types';
import {formatDate} from '../../utils/date';
import {fetcher} from '../../utils/fetcher';

import Item from './components/Item';

const PreOrderSreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<FlatList<PreOrder> | null>(null);
  useScrollToTop(scrollRef);

  const {
    data,
    isFetchedAfterMount,
    isFetching,
    dataUpdatedAt,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['po'],
    queryFn: () => fetcher<PreOrder[]>({url: '/protected/po'}),
  });

  const handleNavigate = (item: PreOrder) => {
    navigation.navigate('PreOrderDetail', {taskId: item.PONumber2});
  };

  return (
    <FlatList
      ref={scrollRef}
      data={data?.data}
      keyExtractor={item => item.PONumber2}
      ListEmptyComponent={!isFetching ? <Empty /> : null}
      ListHeaderComponent={<ListHeader show={isFetching} />}
      ListFooterComponent={
        <ListFooter
          title={`Data diperbarui pada: ${formatDate(dataUpdatedAt)}`}
          show={isSuccess}
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={isFetchedAfterMount && isFetching}
          onRefresh={refetch}
        />
      }
      renderItem={({item, index}) => (
        <Item item={item} index={index} onPress={handleNavigate} />
      )}
    />
  );
};

export default PreOrderSreen;
