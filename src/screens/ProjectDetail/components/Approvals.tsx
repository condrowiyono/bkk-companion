import React from 'react';
import {View} from 'react-native-ui-lib';
import dayjs from 'dayjs';
import Descriptions from '../../../components/Descriptions';
import type {Project} from '../../../interfaces/project';

type DetailProps = {
  route: {data?: Project};
};

const Attachement = (props: DetailProps) => {
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
            value: data.approval_kuu,
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
            value: data.approval_dirOp,
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
            value: data.approval_dirkeu,
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

export default Attachement;
