import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

type DescriptionsItem = {
  index: number | string;
  label: string;
  value: string | null;
};

type DescriptionsProps = {
  data?: DescriptionsItem[];
};

const Descriptions = (props: DescriptionsProps) => {
  const {data} = props;

  const handleLongPress = (value: string | null) => {
    if (!value) {
      return;
    }

    Clipboard.setString(value);
    Toast.show({type: 'success', text1: 'Text berhasil di-salin'});
  };

  if (!data) {
    return null;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString() + item.index.toString()}
      renderItem={({item, index}) => (
        <View
          row
          padding-12
          style={{
            backgroundColor: index % 2 === 0 ? Colors.grey70 : 'transparent',
          }}>
          <Text text80 style={styles.label}>
            {item.label}:
          </Text>
          <Text
            flex
            numberOfLines={3}
            text80M
            selectable
            onLongPress={() => handleLongPress(item.value)}>
            {item.value}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    width: 120,
  },
});
export default Descriptions;
