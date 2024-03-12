import React from 'react';
import {View} from 'react-native-ui-lib';
import dayjs from 'dayjs';
import Descriptions from '../../../components/Descriptions';
import {ApprovalStatus, type Project} from '../../../interfaces/project';

type DetailProps = {
  route: {data?: Project};
};

const formatApproval = (approval: string | number | undefined) => {
  const parseApproval = Number(approval);
  if (parseApproval === ApprovalStatus.APPROVED) {
    return 'Disetujui';
  } else if (parseApproval === ApprovalStatus.REJECTED) {
    return 'Ditolak';
  } else if (parseApproval === ApprovalStatus.NOT_APPROVED) {
    return 'Belum diproses';
  }

  return approval;
};

const Approval = (props: DetailProps) => {
  const {data} = props.route;

  if (!data) {
    return null;
  }

  return (
    <View>
      <Descriptions
        data={[
          {
            index: 0,
            label: 'Persetujuan Kepala Divisi PMO',
            value: formatApproval(data.approval_kuu),
          },
          {
            index: 1,
            label: 'Tanggal Persetujuan Kepala Divisi PMO',
            value: data.app_kuu_dt
              ? dayjs(data.app_kuu_dt).format('DD MMMM YYYY HH:mm:ss')
              : '-',
          },
          {
            index: 2,
            label: 'Persetujuan Direktur Operasional',
            value: formatApproval(data.approval_dirOp),
          },
          {
            index: 3,
            label: 'Tanggal Persetujuan Direktur Operasional',
            value: data.app_dirop_dt
              ? dayjs(data.app_dirop_dt).format('DD MMMM YYYY HH:mm:ss')
              : '-',
          },
          {
            index: 4,
            label: 'Persetujuan Direktur Keuangan',
            value: formatApproval(data.approval_dirkeu),
          },
          {
            index: 5,
            label: 'Tanggal Persetujuan Direktur Keuangan',
            value: data.app_dirkeu_dt
              ? dayjs(data.app_dirkeu_dt).format('DD MMMM YYYY HH:mm:ss')
              : '-',
          },
        ]}
      />
    </View>
  );
};

export default Approval;
