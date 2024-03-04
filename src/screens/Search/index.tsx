import {useNavigation} from '@react-navigation/native';
import React, {Key, useLayoutEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native-ui-lib';

import {NavigationProp} from '../../navigations/types';
import Icon from 'react-native-vector-icons/Ionicons';
import Chips from '../../components/Chips';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery} from '@tanstack/react-query';
import Item from './components/Item';
import ListFooter from '../../components/ListFooter';
import {formatDate} from '../../utils/date';
import {SearchResult} from '../../interfaces/search';
import {fetchAll} from '../../utils/search';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const filterOptions = [
  {value: 'projects', label: 'Proyek Budget'},
  {value: 'projects-history', label: 'Riwayat Budget'},
  {value: 'scm', label: 'Proyek SCM'},
  {value: 'scm-history', label: 'Proyek SCM'},
];

const Search = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Key | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const containerStyle = useMemo(() => {
    return {
      paddingTop: insets.top + Platform.OS === 'ios' ? 52 : 0,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };
  }, [insets]);

  const {data, isFetching, isSuccess, dataUpdatedAt} = useQuery({
    queryKey: ['search', search],
    queryFn: () => fetchAll(search),
  });

  const handleNavigate = (item: SearchResult) => {
    navigation.navigate('TaskDetail', {taskId: item.value});
  };

  const handleReset = () => {
    setSearch('');
    setSelected(null);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoFocus: true,
        placeholder: 'Cari...',
        onChangeText: e => setSearch(e.nativeEvent.text),
        onClose: () => handleReset(),
        onCancelButtonPress: () => handleReset(),
      },
    });
  }, [navigation]);

  if (search === '') {
    return (
      <View flex center>
        <Icon name="search" size={64} />
        <Text>Hasil pencarian akan muncul di sini</Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View flex center>
        <Text>Memuat...</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <ScrollView
        alwaysBounceHorizontal={true}
        horizontal={true}
        style={styles.scrollContainer}>
        <Chips
          options={filterOptions}
          values={selected}
          onChanges={setSelected}
          style={styles.chipContainer}
        />
      </ScrollView>
      <FlatList
        style={styles.flatListContainer}
        keyExtractor={item => item.value}
        data={data?.filter(item => (selected ? item.type === selected : true))}
        renderItem={({item, index}) => (
          <Item item={item} index={index} onPress={handleNavigate} />
        )}
        ListHeaderComponent={<View height={12} />}
        ListFooterComponent={
          <ListFooter
            title={`Data diperbarui pada: ${formatDate(dataUpdatedAt)}`}
            show={isSuccess}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
  },
  chipContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    gap: 4,
  },
  flatListContainer: {
    flexGrow: 1,
  },
});

export default Search;
