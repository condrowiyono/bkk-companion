import React, {Key, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {
  Colors,
  SkeletonView,
  TabController,
  Text,
  View,
  TabControllerItemProps,
} from 'react-native-ui-lib';
import {FlatList, RefreshControl} from 'react-native';
import {fetcher} from '../../utils/fetcher';
import {useQuery} from '@tanstack/react-query';
import Item from './components/Item';
import Chips from '../../components/Chips';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../navigations/types';

export type Magagize = {
  title: string;
  id: string;
  cover_url: string;
  release_date: string;
};

type ResponseMagazine = {
  data: Magagize[];
};

const filterOptions = [
  {value: 'budget', label: 'Budget'},
  {value: 'scm', label: 'SCM'},
];

const History = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<Key[]>([]);
  const {data, isFetching, dataUpdatedAt, refetch, isSuccess} = useQuery({
    queryKey: ['history'],
    queryFn: () => fetcher<ResponseMagazine>('/mobile/v1/magazines'),
  });

  const tabs = useMemo<TabControllerItemProps[]>(
    () => [{label: 'Perlu Tindakan', badge: {label: '12'}}, {label: 'Riwayat'}],
    [],
  );

  const handleNavigate = (item: Magagize) => {
    navigation.navigate('TaskDetail', {taskId: item.id});
    console.log('navigate to detail', item);
  };

  return (
    <>
      <TabController items={tabs}>
        <TabController.TabBar />
        <View flex>
          <TabController.TabPage index={0}>
            <View row gap-12 margin-12>
              <Chips
                options={filterOptions}
                values={selected}
                onChanges={setSelected}
              />
            </View>
            <FlatList
              data={data?.data}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
              }
              renderItem={({item, index}) => (
                <Item item={item} index={index} onPress={handleNavigate} />
              )}
              ListFooterComponent={
                <>
                  {isSuccess && (
                    <Text center>
                      Data diperbarui pada:{' '}
                      {dayjs(dataUpdatedAt).format('DD MMMM YYYY HH:mm:ss')}
                    </Text>
                  )}
                </>
              }
            />
          </TabController.TabPage>
          <TabController.TabPage index={1} lazy>
            <View row gap-12 margin-12>
              <Chips
                options={[
                  {value: 'budget', label: 'Budget'},
                  {value: 'scm', label: 'SCM'},
                ]}
                values={selected}
                onChanges={setSelected}
              />
            </View>
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              borderRadius={12}
              times={10}
              colors={[Colors.grey80, Colors.grey70, Colors.grey60]}
              listProps={{
                hideSeparator: true,
                contentType: 'thumbnail',
                size: 'large',
              }}
            />
          </TabController.TabPage>
        </View>
      </TabController>
    </>
  );
};

export default History;
