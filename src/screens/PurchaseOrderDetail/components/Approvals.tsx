import React from 'react';
import {View} from 'react-native-ui-lib';
import Descriptions from '../../../components/Descriptions';
import {ApprovalStatus, PurchaseOrder} from '../../../interfaces/purchaseOrder';

type DetailProps = {
  route: {data?: PurchaseOrder};
};

const formatApproval = (approval: string | null) => {
  const parseApproval = Number(approval);
  if (parseApproval === ApprovalStatus.APPROVED) {
    return 'Disetujui';
  } else if (parseApproval === ApprovalStatus.REJECTED) {
    return 'Ditolak';
  } else if (parseApproval === ApprovalStatus.NOT_APPROVED) {
    return 'Belum diproses';
  }

  return approval || '-';
};

const Approval = (props: DetailProps) => {
  const {data} = props.route;

  if (!data) {
    return null;
  }

  return (
    <View flexG>
      <Descriptions
        data={[
          {
            index: 0,
            label: 'Persetujuan KUU',
            value: formatApproval(data.app_kuu),
          },
          {
            index: 1,
            label: 'Persetujuan PIC',
            value: formatApproval(data.app_pic),
          },
          {
            index: 2,
            label: 'Persetujuan PM',
            value: formatApproval(data.app_pm),
          },
        ]}
      />
    </View>
  );
};

export default Approval;
