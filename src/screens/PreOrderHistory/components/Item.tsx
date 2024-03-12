import * as React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text, Card, Colors} from 'react-native-ui-lib';
import {PressableScale} from '../../../components/PressableScale';
import {PreOrder} from '../../../interfaces/preOrder';
import {formatDate} from '../../../utils/date';

type Props = {
  item: PreOrder;
  index: number;
  onPress?: (item: PreOrder) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <PressableScale style={[styles.card]} onPress={() => props.onPress?.(item)}>
      <Card padding={false}>
        <View row gap-12>
          <View center style={styles.avatar}>
            <Text white text900BL center>
              {item.PONumber?.slice(0, 5)}
            </Text>
          </View>
          <View centerV flex-1>
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
        </View>
      </Card>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
  },
  avatar: {
    minHeight: 96,
    width: 88,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.blue40,
  },
});

export default React.memo(Item);
