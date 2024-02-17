import * as React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text, Card, Colors} from 'react-native-ui-lib';
import dayjs from 'dayjs';
import {PressableScale} from '../../../components/PressableScale';
import {Task} from '../../../interfaces/task';
import {getFirstAndLastNames} from '../../../utils/text';

export function getImageUrl(url?: string) {
  const IMAGE_CDN_URL = 'https://d1nhzmcelkge58.cloudfront.net';

  return encodeURI(`${IMAGE_CDN_URL}/${url}`);
}

type Props = {
  item: Task;
  index: number;
  onPress?: (item: Task) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <PressableScale style={[styles.card]} onPress={() => props.onPress?.(item)}>
      <Card padding={false}>
        <View row gap-12>
          <View center style={styles.avatar}>
            <Text text60L $backgroundGeneralLight>
              {getFirstAndLastNames(item.customer)}
            </Text>
          </View>
          <View centerV flex-1>
            <Text text80H numberOfLines={1} $textNeutral>
              {item.kode_prod}
            </Text>
            <Text numberOfLines={3} text70H>
              {item.nama_prod}
            </Text>
            <Text text90H numberOfLines={1} $textNeutral>
              {dayjs(item.tgl_mulai).format('DD MMM YYYY')}
              {' - '}
              {dayjs(item.tgl_akhir).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </Card>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  avatar: {
    minHeight: 80,
    width: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.blue40,
  },
});

export default React.memo(Item);
