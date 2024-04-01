import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MenuView, NativeActionEvent} from '@react-native-menu/menu';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TabView, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  Button,
  Colors,
  Dialog,
  PanningProvider,
  Card,
} from 'react-native-ui-lib';

import {StackList} from '../../navigations/types';
import {fetcher} from '../../utils/fetcher';
import {formatCurrency} from '../../utils/currency';
import {
  ApprovalStatus,
  type Project,
  type UpdateStatusPayload,
  type UpdateStatusResponse,
} from '../../interfaces/project';
import Error from '../../components/Error';
import Laoding from '../../components/Loading';

import Detail from './components/Detail';
import Approvals from './components/Approvals';
import Budget from './components/Budget';
import TabBarComponent from './components/TabBarComponent';
import Status from './components/Status';

const renderScene = SceneMap({
  first: Detail,
  second: Budget,
  third: Approvals,
});

const ProjectDetail = () => {
  const queryClient = useQueryClient();
  const {
    params: {taskId},
  } = useRoute<RouteProp<StackList, 'ProjectDetail'>>();

  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<{
    isVisible: boolean;
    data?: {approvals: ApprovalStatus};
  }>({
    isVisible: false,
    data: undefined,
  });

  const {data, isLoading, isFetching, isError, refetch} = useQuery({
    queryKey: ['project', taskId],
    queryFn: () => fetcher<Project>({url: `/protected/projects/${taskId}`}),
  });

  const {mutate: updateStatus, isPending} = useMutation<
    UpdateStatusResponse,
    any,
    UpdateStatusPayload
  >({
    mutationFn: body =>
      fetcher({
        url: `/protected/approve-projects/${taskId}`,
        method: 'POST',
        data: body,
      }),
    onSuccess: success => {
      if (success.data?.pesan) {
        Toast.show({type: 'success', text1: success.data?.pesan});
      }
    },
    onError: error => {
      Toast.show({type: 'error', text1: `Proses Gagal: ${error.message}`});
    },
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries({queryKey: ['projects']});
      queryClient.invalidateQueries({queryKey: ['projects_history']});
    },
  });

  const routes = useMemo(
    () => [
      {key: 'first', title: 'Rincian', data: data?.data},
      {key: 'second', title: 'Budget', data: data?.data},
      {key: 'third', title: 'Persetujuan', data: data?.data},
    ],
    [data],
  );

  const handleMenuAction = ({nativeEvent}: NativeActionEvent) => {
    if (nativeEvent.event === 'reset') {
      setDialog({
        isVisible: true,
        data: {approvals: ApprovalStatus.NOT_APPROVED},
      });
    }
  };

  if (isLoading || isFetching) {
    return <Laoding />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <View backgroundColor={Colors.white} padding-12 gap-12>
        <View gap-4>
          <View gap-8 marginB-8>
            <Text grey30 selectable>
              {data?.data?.kode_prod}
            </Text>
            <Text text60 selectable>
              {data?.data?.nama_prod}
            </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={{gap: 16}}>
            <View>
              <Text grey30 center text90L>
                Kepala Divisi PMO
              </Text>
              <Status status={data?.data?.approval_kuu} />
            </View>
            <View>
              <Text grey30 center>
                Direktur Operasional
              </Text>
              <Status status={data?.data?.approval_dirOp} />
            </View>
            <View>
              <Text grey30 center>
                Direktur Keuangan
              </Text>
              <Status status={data?.data?.approval_dirkeu} />
            </View>
          </ScrollView>
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
            {formatCurrency(data?.data?.nilai_prod_rp)}
          </Text>
        </View>
        <View row spread gap-8 centerV>
          <MenuView
            title="Pilih Aksi"
            onPressAction={handleMenuAction}
            actions={[
              {
                id: 'reset',
                title: 'Reset Status',
                subtitle: 'Kembalikan status ke belum diproses',
              },
            ]}>
            <TouchableNativeFeedback>
              <Icon name="ellipsis-vertical" size={24} color={Colors.grey10} />
            </TouchableNativeFeedback>
          </MenuView>
          <Button
            flexG
            flex
            disabledBackgroundColor={Colors.grey40}
            backgroundColor={Colors.red30}
            disabled={isPending}
            onPress={() => {
              setDialog({
                isVisible: true,
                data: {approvals: ApprovalStatus.APPROVED},
              });
            }}>
            <View flex row center>
              <Icon name="close" size={24} color={Colors.white} />
              <Text text70M color={Colors.white}>
                Tolak
              </Text>
            </View>
          </Button>
          <Button
            flexG
            flex
            disabledBackgroundColor={Colors.grey40}
            backgroundColor={Colors.green30}
            disabled={isPending}
            onPress={() => {
              setDialog({
                isVisible: true,
                data: {approvals: ApprovalStatus.APPROVED},
              });
            }}>
            <View flex row center>
              <Icon name="checkmark" size={24} color={Colors.white} />
              <Text text70M color={Colors.white}>
                Setujui
              </Text>
            </View>
          </Button>
        </View>
      </View>
      <Dialog
        visible={dialog.isVisible}
        onDismiss={() => setDialog({isVisible: false})}
        panDirection={PanningProvider.Directions.DOWN}>
        <Card>
          <Text text60M marginB-12>
            Apakah Anda yakin?
          </Text>
          <Text text70>
            Apakah Anda yakin ingin mengubah status persetujuan
          </Text>
          <View row right gap-12 marginT-24>
            <Button
              backgroundColor={Colors.grey40}
              label="Batal"
              onPress={() => setDialog({isVisible: false})}
            />
            <Button
              label="Ya"
              onPress={() => {
                updateStatus({approvals: dialog.data?.approvals});
                setDialog({isVisible: false});
              }}
            />
          </View>
        </Card>
      </Dialog>
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
export default ProjectDetail;
