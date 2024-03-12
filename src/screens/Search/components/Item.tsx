import * as React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text, Card, Colors} from 'react-native-ui-lib';
import {PressableScale} from '../../../components/PressableScale';
import {SearchResult} from '../../../interfaces/search';

type Props = {
  item: SearchResult;
  index: number;
  onPress?: (item: SearchResult) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <PressableScale style={[styles.card]} onPress={() => props.onPress?.(item)}>
      <Card padding={false}>
        <View row gap-12>
          <View center style={styles.avatar}>
            <Text white text70BL center>
              {item.value}
            </Text>
          </View>
          <View centerV flex-1>
            <Text text90BL numberOfLines={1} $textNeutral uppercase>
              {item.type}
            </Text>
            <Text text80H numberOfLines={1} $textNeutral>
              {item.value}
            </Text>
            <Text numberOfLines={3} text70H>
              {item.label}
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
    minHeight: 120,
    width: 88,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.blue40,
  },
});

export default React.memo(Item);
