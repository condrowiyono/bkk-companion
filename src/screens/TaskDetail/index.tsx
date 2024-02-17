import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {View, Text, Button, Colors, Chip} from 'react-native-ui-lib';
import {StackList} from '../../navigations/types';
import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusChips from '../../components/StatusChips';
import {TabView, SceneMap} from 'react-native-tab-view';
import type {Task} from '../../interfaces/task';
import Detail from './components/Detail';
import Attachment from './components/Attachment';
import Budget from './components/Budget';
import TabBarComponent from './components/TabBarComponent';
import {formatCurrency} from '../../utils/currency';

const renderScene = SceneMap({
  first: Detail,
  second: Budget,
  third: Attachment,
});

const TaskDetail = () => {
  const {params} = useRoute<RouteProp<StackList, 'TaskDetail'>>();
  const {taskId} = params;
  const {data} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () =>
      fetcher<Task[]>(
        'https://run.mocky.io/v3/c5818677-12ee-4c04-8923-e78325b7c0a1',
      ),
  });

  const rand = useMemo(() => Math.random(), []);
  const [index, setIndex] = useState(0);
  const routes = useMemo(
    () => [
      {key: 'first', title: 'Rincian', data: data?.[0]},
      {key: 'second', title: 'Budget', data: data?.[0]},
      {key: 'third', title: 'Lampiran', data: data?.[0]},
    ],
    [data],
  );

  return (
    <>
      <View backgroundColor={Colors.white} padding-12 gap-12>
        <View gap-4>
          <Text numberOfLines={3} text60BL>
            {data?.[0].nama_prod}
          </Text>
          <Text grey30>{data?.[0].kode_prod}</Text>
          {data && (
            <View style={styles.chipContainer}>
              <Chip label={data?.[0].segmen_name} />
              {rand > 0.5 ? (
                <StatusChips type="success" label="DISETUJUI" />
              ) : (
                <StatusChips type="warning" label="DIPROSES" />
              )}
            </View>
          )}
        </View>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBarComponent {...props} onChageIndex={setIndex} />
        )}
      />

      <View height={120} />
      <View
        flex
        backgroundColor={Colors.white}
        style={styles.actions}
        padding-12>
        <View row spread centerV marginB-24>
          <Text text80>Nilai Produk</Text>
          <Text text70R style={{fontWeight: 'bold'}}>
            {formatCurrency(data?.[0].nilai_prod_rp)}
          </Text>
        </View>
        <View row spread gap-16>
          <Button flex style={{backgroundColor: Colors.red10}}>
            <View flex row center>
              <Icon name="close" size={24} color={Colors.white} />
              <Text text70 style={{fontWeight: 'bold'}} color={Colors.white}>
                Tolak
              </Text>
            </View>
          </Button>
          <Button flex style={{backgroundColor: Colors.green10}}>
            <View flex row center>
              <Icon name="checkmark" size={24} color={Colors.white} />
              <Text text70 style={{fontWeight: 'bold'}} color={Colors.white}>
                Setujui
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detail: {
    height: '100%',
    padding: 12,
    backgroundColor: Colors.white,
  },
  actions: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.grey20,
    position: 'absolute',
    bottom: 0,
    height: 120,
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
});
export default TaskDetail;
