import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
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

const TaskDetail = () => {
  const queryClient = useQueryClient();
  const {
    params: {taskId},
  } = useRoute<RouteProp<StackList, 'TaskDetail'>>();

  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<{
    isVisible: boolean;
    data?: {approvals: ApprovalStatus};
  }>({
    isVisible: false,
    data: undefined,
  });

  const {data, isLoading, isFetching, refetch} = useQuery({
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
    onSuccess: successData => {
      if (successData.data?.pesan) {
        Toast.show({
          type: 'success',
          text1: successData.data?.pesan,
          visibilityTime: 3000,
        });
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: `Proses Gagal: ${error.message}`,
        visibilityTime: 3000,
      });
    },
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries({queryKey: ['projects']});
      queryClient.invalidateQueries({queryKey: ['histories']});
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

  const budgetApproval = useMemo(() => {
    if (data?.data?.app_kuu_dt) {
      return ApprovalStatus.APPROVED;
    } else {
      return ApprovalStatus.NOT_APPROVED;
    }
  }, [data]);

  const handleMenuAction = ({nativeEvent}: NativeActionEvent) => {
    if (nativeEvent.event === 'reset') {
      setDialog({
        isVisible: true,
        data: {approvals: ApprovalStatus.NOT_APPROVED},
      });
    }
  };

  if (isLoading || isFetching) {
    return (
      <View flex center>
        <Text>Memuat...</Text>
      </View>
    );
  }

  return (
    <>
      <View backgroundColor={Colors.white} padding-12 gap-12>
        <View gap-4>
          <Text numberOfLines={3} text60BL>
            {data?.data?.nama_prod}
          </Text>
          <Text grey30>{data?.data?.kode_prod}</Text>
          {data && (
            <View style={styles.chipContainer}>
              <Status status={budgetApproval} />
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
            disabled={
              budgetApproval !== ApprovalStatus.NOT_APPROVED || isPending
            }
            onPress={() => {
              setDialog({
                isVisible: true,
                data: {approvals: ApprovalStatus.APPROVED},
              });
            }}>
            <View flex row center>
              <Icon name="close" size={24} color={Colors.white} />
              <Text text70 style={{fontWeight: 'bold'}} color={Colors.white}>
                Tolak
              </Text>
            </View>
          </Button>
          <Button
            flexG
            flex
            disabledBackgroundColor={Colors.grey40}
            backgroundColor={Colors.green30}
            disabled={
              budgetApproval !== ApprovalStatus.NOT_APPROVED || isPending
            }
            onPress={() => {
              setDialog({
                isVisible: true,
                data: {approvals: ApprovalStatus.APPROVED},
              });
            }}>
            <View flex row center>
              <Icon name="checkmark" size={24} color={Colors.white} />
              <Text text70 style={{fontWeight: 'bold'}} color={Colors.white}>
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
          <Text text60BL marginB-12>
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
export default TaskDetail;
