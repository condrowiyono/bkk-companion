import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, Colors} from 'react-native-ui-lib';

import {PressableScale} from '../../../components/PressableScale';
import {Project} from '../../../interfaces/project';
import {formatDate} from '../../../utils/date';

type Props = {
  item: Project;
  index: number;
  onPress?: (item: Project) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <PressableScale style={[styles.card]} onPress={() => props.onPress?.(item)}>
      <Card padding={false}>
        <View row gap-12>
          <View center style={styles.avatar}>
            <Text white text70BL>
              {item.kode_prod}
            </Text>
          </View>
          <View centerV flex-1>
            <Text text80 numberOfLines={1} $textNeutral>
              {item.kode_prod}
            </Text>
            <Text numberOfLines={3} text70H>
              {item.nama_prod}
            </Text>
            <Text text90 numberOfLines={1} $textNeutral>
              {formatDate(item.tgl_mulai, 'DD MMM YYYY')}
              {' - '}
              {formatDate(item.tgl_akhir, 'DD MMM YYYY')}
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
    minHeight: 120,
    width: 88,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.blue40,
  },
});

export default React.memo(Item);
