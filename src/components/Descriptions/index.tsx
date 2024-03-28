import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

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
          <Text flex numberOfLines={3} text80H selectable>
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
