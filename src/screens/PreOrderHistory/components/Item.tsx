import * as React from 'react';

import {View, Text} from 'react-native-ui-lib';
import {PreOrder} from '../../../interfaces/preOrder';
import {formatDate} from '../../../utils/date';
import TouchableCard from '../../../components/TouchableCard';

type Props = {
  item: PreOrder;
  index: number;
  onPress?: (item: PreOrder) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <TouchableCard onPress={() => props.onPress?.(item)}>
      <View padding-12>
        <Text text80 numberOfLines={1} $textNeutral>
          {item.PONumber}
        </Text>
        <Text numberOfLines={3} text70H>
          {item.VendorNo} - {item.VendorName}
        </Text>
        <Text text90H numberOfLines={1} $textNeutral>
          {formatDate(item.PODate, 'DD MMM YYYY')}
        </Text>
      </View>
    </TouchableCard>
  );
};

export default React.memo(Item);
