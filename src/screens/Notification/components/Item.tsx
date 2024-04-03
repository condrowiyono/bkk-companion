import * as React from 'react';

import {View, Text} from 'react-native-ui-lib';
import {formatDate} from '../../../utils/date';
import TouchableCard from '../../../components/TouchableCard';
import {Notification} from '../../../interfaces/notification';

type Props = {
  item: Notification;
  index: number;
  onPress?: (item: Notification) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <TouchableCard onPress={() => props.onPress?.(item)}>
      <View padding-12>
        <Text numberOfLines={3} text70M>
          {item.title}
        </Text>
        <Text text80 numberOfLines={3} $textNeutral>
          {item.body}
        </Text>
        <Text text90L numberOfLines={1} $textNeutral>
          {formatDate(item.createdAt, 'DD MMM YYYY HH:mm')}
        </Text>
      </View>
    </TouchableCard>
  );
};

export default React.memo(Item);
