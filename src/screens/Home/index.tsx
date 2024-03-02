import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Colors, Text} from 'react-native-ui-lib';

import {PressableScale} from '../../components/PressableScale';
import {Project} from '../../interfaces/project';
import {NavigationProp} from '../../navigations/types';
import {fetcher} from '../../utils/fetcher';

export type HomeItem = {
  id: number;
  title: string;
  subtitle: string;
  bgIcon: string;
  screen?: string;
};

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = (screen: string) => {
    navigation.navigate('TabNavigator', {screen});
  };

  const {data: projects} = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetcher<Project[]>({url: '/protected/projects'}),
  });
  const {data: histories} = useQuery({
    queryKey: ['histories'],
    queryFn: () => fetcher<Project[]>({url: '/protected/projects-history'}),
  });

  return (
    <ScrollView>
      <PressableScale
        style={[styles.card, {marginTop: 16}]}
        onPress={() => handleNavigate('Project')}>
        <Card>
          <Text text60>{'Perlu Tindakan'}</Text>
          <Text grey30>{'Jumlah persetujuan yang diperlukan'}</Text>
          <Text text30 $textPrimary>
            {projects?.data?.length ?? undefined}
          </Text>
          <Text text70 $textPrimary>
            Klik untuk melihat lebih lanjut
          </Text>
          <Icon
            name={'rocket-outline'}
            size={96}
            color={Colors.grey60}
            style={styles.bgIcon}
          />
        </Card>
      </PressableScale>
      <PressableScale
        style={styles.card}
        onPress={() => handleNavigate('History')}>
        <Card>
          <Text text60>{'Riwayat Persetujuan'}</Text>
          <Text grey30>{'Riwayat persetujuan yang sudah dilakukan'}</Text>
          <Text text30 $textPrimary>
            {histories?.data?.length ?? undefined}
          </Text>
          <Text text70 $textPrimary>
            Klik untuk melihat lebih lanjut
          </Text>
          <Icon
            name={'receipt-outline'}
            size={96}
            color={Colors.grey60}
            style={styles.bgIcon}
          />
        </Card>
      </PressableScale>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  bgIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
export default Home;
