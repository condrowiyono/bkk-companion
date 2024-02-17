import React, {Key, useState} from 'react';
import dayjs from 'dayjs';
import {Text, View} from 'react-native-ui-lib';
import {FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import {fetcher} from '../../utils/fetcher';
import Chips from '../../components/Chips';
import {NavigationProp} from '../../navigations/types';
import {Task} from '../../interfaces/task';

import Item from './components/Item';

const filterOptions = [
  {value: 'budget', label: 'Budget'},
  {value: 'scm', label: 'SCM'},
];

const History = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<Key[]>([]);
  const {data, isFetching, dataUpdatedAt, refetch, isSuccess} = useQuery({
    queryKey: ['history'],
    queryFn: () =>
      fetcher<Task[]>(
        'https://run.mocky.io/v3/76560170-ce81-404b-989d-8d6bba4b1260',
      ),
  });

  //

  const handleNavigate = (item: Task) => {
    navigation.navigate('TaskDetail', {taskId: item.kode_prod});
    console.log('navigate to detail', item);
  };

  return (
    <>
      <View row padding-12 gap-12>
        <Chips
          options={filterOptions}
          values={selected}
          onChanges={setSelected}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.kode_prod}
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
    </>
  );
};

export default History;
