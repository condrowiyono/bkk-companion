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
import {
  type PurchaseOrder,
  ApprovalStatus,
  type UpdateStatusPayload,
  type UpdateStatusResponse,
} from '../../interfaces/purchaseOrder';

import Error from '../../components/Error';
import Laoding from '../../components/Loading';

import TabBarComponent from './components/TabBarComponent';
import {formatDate} from '../../utils/date';
import Detail from './components/Detail';
import {formatCurrency} from '../../utils/currency';
import ItemTab from './components/ItemTab';
import Approval from './components/Approvals';
import Status from './components/Status';

const renderScene = SceneMap({
  first: Detail,
  second: ItemTab,
  third: Approval,
});

const PurchaseOrderDetail = () => {
  const queryClient = useQueryClient();
  const {
    params: {taskId},
  } = useRoute<RouteProp<StackList, 'PurchaseOrderDetail'>>();

  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<{
    isVisible: boolean;
    data?: {approvals: ApprovalStatus};
  }>({
    isVisible: false,
    data: undefined,
  });

  const {data, isLoading, isFetching, refetch, isError} = useQuery({
    queryKey: ['po', taskId],
    queryFn: () => fetcher<PurchaseOrder>({url: `/protected/po/${taskId}`}),
  });

  const disableAction = useMemo(
    () => Number(data?.data?.status) === ApprovalStatus.APPROVED,
    [data],
  );

  const {mutate: updateStatus, isPending} = useMutation<
    UpdateStatusResponse,
    any,
    UpdateStatusPayload
  >({
    mutationFn: body =>
      fetcher({
        url: `/protected/approve-po/${taskId}`,
        method: 'POST',
        data: body,
      }),
    onSuccess: successData => {
      if (successData.data?.pesan) {
        Toast.show({type: 'success', text1: successData.data?.pesan});
      }
    },
    onError: error => {
      Toast.show({type: 'error', text1: `Proses Gagal: ${error.message}`});
    },
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries({queryKey: ['po']});
      queryClient.invalidateQueries({queryKey: ['po-history']});
    },
  });

  const routes = useMemo(
    () => [
      {key: 'first', title: 'Rincian', data: data?.data},
      {key: 'second', title: 'Item', data: data?.data},
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

  if (!data?.data?.PONumber2) {
    return <Error />;
  }

  return (
    <>
      <View backgroundColor={Colors.white}>
        <View gap-4 padding-12>
          <View gap-4>
            <Text numberOfLines={3} text80M selectable>
              {data?.data?.VendorNo} - {data?.data?.VendorName}
            </Text>
            <Text text60BL selectable>
              {data?.data?.PONumber}
            </Text>
            <Text grey30>{formatDate(data?.data?.PODate, 'DD MMMM YYYY')}</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{gap: 12, paddingHorizontal: 12}}>
          <View>
            <Text grey30 center>
              Persetujuan PIC
            </Text>
            <Status status={data?.data?.app_pic} />
          </View>
          <View>
            <Text grey30 center>
              Persetujuan PM
            </Text>
            <Status status={data?.data?.app_pm} />
          </View>
          <View>
            <Text grey30 center>
              Persetujuan Ka Div
            </Text>
            <Status status={data?.data?.app_kuu} />
          </View>
        </ScrollView>
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
        spread
        backgroundColor={Colors.white}
        style={styles.actions}
        padding-12>
        <View>
          <View row spread centerV>
            <Text text80>Total</Text>
            <Text text70 style={{fontWeight: 'bold'}}>
              {formatCurrency(data?.data?.Total, data?.data?.mataUang)}
            </Text>
          </View>
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
            disabled={isPending || disableAction}
            onPress={() => {
              setDialog({
                isVisible: true,
                data: {approvals: ApprovalStatus.REJECTED},
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
            disabled={isPending || disableAction}
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
export default PurchaseOrderDetail;
