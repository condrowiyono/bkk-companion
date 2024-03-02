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
            label: 'approval_kuu',
            value: data.approval_kuu,
          },
          {
            index: 1,
            label: 'Tanggal Approval KUU',
            value: data.app_kuu_dt
              ? dayjs(data.app_kuu_dt).format('DD MMMM YYYY HH:mm:ss')
              : '-',
          },
          {
            index: 2,
            label: 'approval_dirOp',
            value: data.approval_dirOp,
          },
          {
            index: 3,
            label: 'Tanggal Approval DirOp',
            value: data.app_dirop_dt
              ? dayjs(data.app_dirop_dt).format('DD MMMM YYYY HH:mm:ss')
              : '-',
          },
          {
            index: 4,
            label: 'Approval DirKeu',
            value: data.approval_dirkeu,
          },
          {
            index: 5,
            label: 'Tanggal Approval DirKeu',
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
