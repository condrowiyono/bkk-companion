import React from 'react';
import dayjs from 'dayjs';
import {Text, FlatList, View} from 'react-native';
import {fetcher} from '../../utils/fetcher';
import {useQuery} from '@tanstack/react-query';
import Item from './components/Item';

export type Magagize = {
  title: string;
  id: string;
  cover_url: string;
  release_date: string;
};

type ResponseMagazine = {
  data: Magagize[];
};

const HistoryScreen = () => {
  const {data, dataUpdatedAt} = useQuery({
    queryKey: ['history'],
    queryFn: () =>
      fetcher<ResponseMagazine>(
        'https://mataair-api.orbitallabs.net/mobile/v1/magazines',
      ),
  });

  return (
    <View>
      <FlatList
        data={data?.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item {...item} />}
        ListFooterComponent={
          <Text>Data diperbarui: {dayjs(dataUpdatedAt).toString()}</Text>
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 0.25,
              marginLeft: 84,
            }}
          />
        )}
      />
    </View>
  );
};

export default HistoryScreen;
