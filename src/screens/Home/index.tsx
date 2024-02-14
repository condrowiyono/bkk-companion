import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Item from './components/Item';
import {NavigationProp} from '../../navigations/types';
import {useNavigation} from '@react-navigation/native';

export type HomeItem = {
  id: number;
  title: string;
  subtitle: string;
  count: number;
  bgIcon: string;
  screen?: string;
  screenOptions: {tab: number};
};

const list: HomeItem[] = [
  {
    id: 1,
    title: 'Perlu Tindakan',
    subtitle: 'Jumlah persetujuan yang diperlukan',
    count: 89,
    bgIcon: 'rocket-outline',
    screen: 'History',
    screenOptions: {
      tab: 0,
    },
  },
  {
    id: 2,
    title: 'Riwayat Persetujuan',
    subtitle: 'Riwayat persetujuan yang sudah dilakukan',
    count: 230,
    bgIcon: 'receipt-outline',
    screen: 'History',
    screenOptions: {
      tab: 1,
    },
  },
];

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = (item: HomeItem) => {
    navigation.navigate('TabNavigator', {
      screen: item.screen,
      screenOption: item.screenOptions,
    });
  };

  return (
    <FlatList
      data={list}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <Item item={item} index={index} onPress={handleNavigate} />
      )}
    />
  );
};

export default Home;
