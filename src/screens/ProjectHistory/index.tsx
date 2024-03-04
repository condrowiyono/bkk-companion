import React, {useRef} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import Empty from '../../components/Empty';
import ListHeader from '../../components/ListHeader';
import ListFooter from '../../components/ListFooter';

import {Project} from '../../interfaces/project';
import {NavigationProp} from '../../navigations/types';
import {fetcher} from '../../utils/fetcher';
import {formatDate} from '../../utils/date';

import Item from './components/Item';

const ProjectHistory = () => {
  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<FlatList<Project> | null>(null);
  useScrollToTop(scrollRef);

  const {
    data,
    isFetching,
    dataUpdatedAt,
    isFetchedAfterMount,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['histories'],
    queryFn: () => fetcher<Project[]>({url: '/protected/projects-history'}),
  });

  const handleNavigate = (item: Project) => {
    navigation.navigate('TaskDetail', {taskId: item.kode_prod});
  };

  return (
    <FlatList
      ref={scrollRef}
      data={data?.data}
      keyExtractor={item => item.kode_prod}
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

export default ProjectHistory;
