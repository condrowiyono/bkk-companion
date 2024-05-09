import React from 'react';
import {View} from 'react-native-ui-lib';

import Descriptions from '../../../components/Descriptions';
import {PurchaseOrder} from '../../../interfaces/purchaseOrder';
import {formatDate} from '../../../utils/date';
import {formatCurrency} from '../../../utils/currency';

type DetailProps = {
  route: {data?: PurchaseOrder};
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
            label: 'Divisi',
            value: data.divisi,
          },
          {
            index: 1,
            label: 'Jabatan',
            value: data.jabatan,
          },
          {
            index: 2,
            label: 'Transaksi',
            value: data.jabatan,
          },
          {
            index: 3,
            label: 'Nomor',
            value: data.PONumber,
          },
          {
            index: 4,
            label: 'Tanggal',
            value: formatDate(data.PODate, 'DD MMM YYYY'),
          },
          {
            index: 5,
            label: 'Nomor Vendor',
            value: data.VendorNo,
          },
          {
            index: 6,
            label: 'Nama Vendor',
            value: data.VendorName,
          },
          {
            index: 7,
            label: 'Tanggal Pengiriman',
            value: data.Delivery,
          },
          {
            index: 8,
            label: 'Penanggung Jawab (PIC)',
            value: data.PersonInCharge,
          },
          {
            index: 9,
            label: 'Term of Payment',
            value: data.TermsOfPayment,
          },
          {
            index: 10,
            label: 'Ordered By',
            value: data.OrderedBy,
          },
          {
            index: 11,
            label: 'Kode Produksi',
            value: data.KodeProd,
          },
          {
            index: 12,
            label: 'Nama Dept',
            value: data.KodeDept,
          },
          {
            index: 13,
            label: 'IMEI',
            value: data.imei ?? '-',
          },
          {
            index: 14,
            label: 'Kode Budget',
            value: data.KodeBUdget,
          },
          {
            index: 15,
            label: 'Nilai',
            value: formatCurrency(data.nilai, data.mataUang),
          },
          {
            index: 16,
            label: 'PPN',
            value: `${data.PPN} %`,
          },
          {
            index: 17,
            label: 'Nilai PPN',
            value: formatCurrency(data.PPNNIlai, data.mataUang),
          },
          {
            index: 18,
            label: 'Total',
            value: formatCurrency(data.Total, data.mataUang),
          },
        ]}
      />
    </View>
  );
};

export default Detail;
