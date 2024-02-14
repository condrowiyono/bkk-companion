import React, {memo, useMemo} from 'react';
import {Card, Colors, Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

import {PressableScale} from '../../../components/PressableScale';
import type {HomeItem} from '..';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusChips from '../../../components/StatusChips';

type Props = {
  item: HomeItem;
  index: number;
  onPress?: (item: HomeItem) => void;
};

const Item = (props: Props) => {
  const {item, index, onPress} = props;
  const marginTop = useMemo(() => (index === 0 ? 16 : 0), [index]);

  return (
    <PressableScale
      style={[styles.card, {marginTop}]}
      onPress={() => onPress?.(item)}>
      <Card>
        <Text text60>{item.title}</Text>
        <Text grey30>{item.subtitle}</Text>
        <Text text10 $textPrimary>
          {item.count}
        </Text>
        <View row gap-12>
          <View row centerV gap-4>
            <StatusChips type="danger" label="PENTING - 90" />
          </View>
        </View>
        <Icon
          name={item.bgIcon}
          size={96}
          color={Colors.grey60}
          style={styles.bgIcon}
        />
      </Card>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  bgIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default memo(Item);
