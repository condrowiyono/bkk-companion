import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {View, Text, Button, Colors, TabController} from 'react-native-ui-lib';
import {StackList} from '../../navigations/types';
import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {Magagize} from '../History';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusChips from '../../components/StatusChips';

const TaskDetail = () => {
  const {params} = useRoute<RouteProp<StackList, 'TaskDetail'>>();
  const {taskId} = params;
  const {data, isLoading, isError} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetcher<{data: Magagize}>(`/mobile/v1/magazines/${taskId}`),
  });

  const rand = Math.random();

  return (
    <>
      <View backgroundColor={Colors.white} padding-12 gap-12>
        <View gap-4>
          <Text text60BL>{data?.data.title}</Text>
          <Text grey30>{data?.data.release_date}</Text>
          {!(isLoading && isError) && (
            <View row>
              {rand > 0.5 ? (
                <StatusChips type="success" label="DISETUJUI" />
              ) : (
                <StatusChips type="danger" label="DITOLAK" />
              )}
            </View>
          )}
        </View>
      </View>
      <TabController useSafeArea items={[{label: 'Umum'}, {label: 'Tambahan'}]}>
        <TabController.TabBar
          containerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
        />
        <View flex backgroundColor={Colors.white}>
          <TabController.TabPage index={0}>
            <ScrollView>
              <Text selectable>{JSON.stringify(data?.data)}</Text>
              <View marginV-60 center />
            </ScrollView>
          </TabController.TabPage>
          <TabController.TabPage index={1} lazy>
            <View flex>
              <Text>Second Page</Text>
            </View>
          </TabController.TabPage>
        </View>
      </TabController>
      <View
        flex
        backgroundColor={Colors.white}
        style={styles.actions}
        padding-12>
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
    height: 72,
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
});
export default TaskDetail;
