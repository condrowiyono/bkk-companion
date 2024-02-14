import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Image, View, Text, Card} from 'react-native-ui-lib';
import dayjs from 'dayjs';
import {PressableScale} from '../../../components/PressableScale';
import type {Magagize} from '..';

export function getImageUrl(url?: string) {
  const IMAGE_CDN_URL = 'https://d1nhzmcelkge58.cloudfront.net';

  return encodeURI(`${IMAGE_CDN_URL}/${url}`);
}

type Props = {
  item: Magagize;
  index: number;
  onPress?: (item: Magagize) => void;
};

const Item = (props: Props) => {
  const {item} = props;

  return (
    <PressableScale style={[styles.card]} onPress={() => props.onPress?.(item)}>
      <Card padding={false}>
        <View row gap-12>
          <Image
            source={{uri: getImageUrl(item.cover_url)}}
            style={{
              width: 64,
              height: 80,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          />
          <View centerV flex-1>
            <Text numberOfLines={3} text70>
              {item.title}
            </Text>
            <Text text90H>
              Relase Date: {dayjs(item.release_date).format('DD MMMM YYYY')}
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
});

export default React.memo(Item);
