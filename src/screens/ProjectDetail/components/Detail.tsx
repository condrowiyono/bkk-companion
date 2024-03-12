import React from 'react';
import dayjs from 'dayjs';
import {View} from 'react-native-ui-lib';

import Descriptions from '../../../components/Descriptions';
import type {Project} from '../../../interfaces/project';

type DetailProps = {
  route: {data?: Project};
};

const Detail = (props: DetailProps) => {
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
            label: 'Kode Produk',
            value: data.kode_prod,
          },
          {
            index: 1,
            label: 'Nama Produk',
            value: data.nama_prod,
          },
          {
            index: 2,
            label: 'Nama Segmen',
            value: data.segmen_name,
          },
          {
            index: 3,
            label: 'Kustomer',
            value: data.customer,
          },
          {
            index: 4,
            label: 'Divisi',
            value: data.divisi,
          },
          {
            index: 5,
            label: 'Penanggung Jawab',
            value: data.png_jawab,
          },
          {
            index: 6,
            label: 'Tanggal Mulai',
            value: dayjs(data.tgl_mulai).format('DD MMMM YYYY HH:mm:ss'),
          },
          {
            index: 7,
            label: 'Tanggal Selesai',
            value: dayjs(data.tgl_akhir).format('DD MMMM YYYY HH:mm:ss'),
          },
        ]}
      />
    </View>
  );
};

export default Detail;
