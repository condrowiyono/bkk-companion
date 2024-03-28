import * as React from 'react';

import {View, Text} from 'react-native-ui-lib';
import {Project} from '../../../interfaces/project';
import {formatDate} from '../../../utils/date';
import TouchableCard from '../../../components/TouchableCard';

type Props = {
  item: Project;
  index: number;
  onPress?: (item: Project) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <TouchableCard onPress={() => props.onPress?.(item)}>
      <View padding-12>
        <Text text80 numberOfLines={1} $textNeutral>
          {item.kode_prod}
        </Text>
        <Text numberOfLines={3} text70H>
          {item.nama_prod}
        </Text>
        <Text text90H numberOfLines={1} $textNeutral>
          {formatDate(item.tgl_mulai, 'DD MMM YYYY')}
          {' - '}
          {formatDate(item.tgl_akhir, 'DD MMM YYYY')}
        </Text>
      </View>
    </TouchableCard>
  );
};

export default React.memo(Item);
