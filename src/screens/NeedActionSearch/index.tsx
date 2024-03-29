import {useNavigation} from '@react-navigation/native';
import React, {Key, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {NavigationProp} from '../../navigations/types';
import Icon from 'react-native-vector-icons/Ionicons';
import Laoding from '../../components/Loading';
import {useAuth} from '../../contexts/auth';
import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';
import {SearchResult} from '../../interfaces/search';
import ListFooter from '../../components/ListFooter';
import {formatDate} from '../../utils/date';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Chips from '../../components/Chips';
import TouchableCard from '../../components/TouchableCard';

const filterOptions = [
  {value: 'project', label: 'Proyek Budget'},
  {value: 'purchaseOrder', label: 'Purchase Order'},
];

const NeedActionSearch = () => {
  const {userID} = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Key | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const containerStyle = {
    paddingTop: Platform.OS === 'ios' ? insets.top + 52 : 0,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleReset = () => {
    setSearch('');
    setSelected(null);
  };

  const {data, isFetching, dataUpdatedAt, isSuccess} = useQuery({
    queryKey: ['search', userID, search],
    queryFn: () =>
      fetcher<SearchResult[]>({
        url: '/protected/search',
        params: {query: search},
      }),
  });

  const handleNavigate = (item: SearchResult) => {
    if (item.type === 'project') {
      navigation.navigate('ProjectDetail', {taskId: item.id});
    } else if (item.type === 'preOrder') {
      navigation.navigate('PreOrderDetail', {taskId: item.id});
    }
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
      {isFetching ? (
        <Laoding />
      ) : (
        <FlatList
          keyExtractor={item => `${item.type}-${item.id}`}
          contentInsetAdjustmentBehavior="automatic"
          ListHeaderComponent={<View height={12} />}
          data={data?.data?.filter(item =>
            selected ? item.type === selected : true,
          )}
          ListFooterComponent={
            <ListFooter
              title={`Data diperbarui pada: ${formatDate(dataUpdatedAt)}`}
              show={isSuccess}
            />
          }
          renderItem={({item}) => (
            <TouchableCard onPress={() => handleNavigate(item)}>
              <View padding-12>
                <Text text80 numberOfLines={1} $textNeutral>
                  {item.id}
                </Text>
                <Text numberOfLines={3} text70H>
                  {item.title}
                </Text>
              </View>
            </TouchableCard>
          )}
        />
      )}
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

export default NeedActionSearch;
