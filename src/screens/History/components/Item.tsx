import * as React from 'react';
import {Text, Image, View, TouchableNativeFeedback} from 'react-native';
import type {Magagize} from '..';
import dayjs from 'dayjs';

export function getImageUrl(url?: string) {
  const IMAGE_CDN_URL = 'https://d1nhzmcelkge58.cloudfront.net';

  return encodeURI(`${IMAGE_CDN_URL}/${url}`);
}

const Item = (props: Magagize) => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('press')}>
      <View style={{padding: 8, flexDirection: 'row', gap: 12}}>
        <Image
          source={{uri: getImageUrl(props.cover_url)}}
          style={{
            width: 64,
            height: 80,
            borderRadius: 4,
          }}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text numberOfLines={3} style={{fontSize: 16, fontWeight: '600'}}>
            {props.title}
          </Text>
          <Text>ID: {dayjs(props.release_date).toString()}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default React.memo(Item);
