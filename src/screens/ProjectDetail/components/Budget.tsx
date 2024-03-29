import React from 'react';
import {View} from 'react-native-ui-lib';
import Descriptions from '../../../components/Descriptions';
import type {Project} from '../../../interfaces/project';
import {formatCurrency} from '../../../utils/currency';

type BudgetProps = {
  route: {data?: Project};
};

const Budget = (props: BudgetProps) => {
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
            label: 'Nilai Produk',
            value: formatCurrency(data.nilai_prod_rp),
          },
        ]}
      />
    </View>
  );
};

export default Budget;
