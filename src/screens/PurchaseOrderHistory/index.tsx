import React, {useRef} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import Empty from '../../components/Empty';
import ListHeader from '../../components/ListHeader';
import ListFooter from '../../components/ListFooter';

import {PurchaseOrder} from '../../interfaces/purchaseOrder';
import {NavigationProp} from '../../navigations/types';
import {fetcher} from '../../utils/fetcher';
import {formatDate} from '../../utils/date';

import Item from './components/Item';
import {useAuth} from '../../contexts/auth';

const PurchaseOrderHistory = () => {
  const {userID} = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<FlatList<PurchaseOrder> | null>(null);
  useScrollToTop(scrollRef);

  const {
    data,
    isFetching,
    dataUpdatedAt,
    isFetchedAfterMount,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['po-history', userID],
    queryFn: () => fetcher<PurchaseOrder[]>({url: '/protected/po-history'}),
  });

  const handleNavigate = (item: PurchaseOrder) => {
    navigation.navigate('PurchaseOrderDetail', {taskId: item.PONumber2});
  };

  return (
    <FlatList
      ref={scrollRef}
      data={data?.data}
      keyExtractor={item => item.PONumber2}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={!isFetching ? <Empty /> : null}
      ListHeaderComponent={<ListHeader show={isFetching} />}
      ListFooterComponent={
        <ListFooter
          title={`Data diperbarui pada: ${formatDate(dataUpdatedAt)}`}
          show={isSuccess}
        />
      }
      renderItem={({item, index}) => (
        <Item item={item} index={index} onPress={handleNavigate} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isFetchedAfterMount && isFetching}
          onRefresh={refetch}
        />
      }
    />
  );
};

export default PurchaseOrderHistory;