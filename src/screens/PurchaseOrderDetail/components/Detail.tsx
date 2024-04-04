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
            label: 'Nomor PO',
            value: data.PONumber,
          },
          {
            index: 3,
            label: 'Tanggal PO',
            value: formatDate(data.PODate, 'DD MMM YYYY'),
          },
          {
            index: 4,
            label: 'Nomor Vendor',
            value: data.VendorNo,
          },
          {
            index: 5,
            label: 'Nama Vendor',
            value: data.VendorName,
          },
          {
            index: 6,
            label: 'Tanggal Pengiriman',
            value: data.Delivery,
          },
          {
            index: 7,
            label: 'Penanggung Jawab (PIC)',
            value: data.PersonInCharge,
          },
          {
            index: 8,
            label: 'Term of Payment',
            value: data.TermsOfPayment,
          },
          {
            index: 9,
            label: 'Ordered By',
            value: data.OrderedBy,
          },
          {
            index: 10,
            label: 'Kode Produksi',
            value: data.KodeProd,
          },
          {
            index: 11,
            label: 'Nama Dept',
            value: data.KodeDept,
          },
          {
            index: 12,
            label: 'IMEI',
            value: data.imei ?? '-',
          },
          {
            index: 13,
            label: 'Kode Budget',
            value: data.KodeBUdget,
          },
          {
            index: 14,
            label: 'Nilai PO',
            value: formatCurrency(data.nilai, data.mataUang),
          },
          {
            index: 15,
            label: 'PPN',
            value: `${data.PPN} %`,
          },
          {
            index: 16,
            label: 'Nilai PPN',
            value: formatCurrency(data.PPNNIlai, data.mataUang),
          },
          {
            index: 17,
            label: 'Total',
            value: formatCurrency(data.Total, data.mataUang),
          },
        ]}
      />
    </View>
  );
};

export default Detail;
