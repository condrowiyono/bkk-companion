import React from 'react';
import {View} from 'react-native-ui-lib';

import Descriptions from '../../../components/Descriptions';
import {PreOrder} from '../../../interfaces/preOrder';
import {formatDate} from '../../../utils/date';
import {formatCurrency} from '../../../utils/currency';

type DetailProps = {
  route: {data?: PreOrder};
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
            label: 'Jabaran',
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
            label: 'Delivery Date',
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
            label: 'Nilai Budget',
            value: data.KodeBUdget,
          },
          {
            index: 13,
            label: 'Nilai Budget (Rp)',
            value: formatCurrency(data.nilai),
          },
          {
            index: 14,
            label: 'IMEI',
            value: data.imei ?? '-',
          },
        ]}
      />
    </View>
  );
};

export default Detail;
