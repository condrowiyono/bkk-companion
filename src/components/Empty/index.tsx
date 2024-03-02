import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native-ui-lib';

const Empty = () => {
  return (
    <View center>
      <Icon name="folder-open" size={64} />
      <Text center marginT-16>
        Tidak ada data
      </Text>
    </View>
  );
};

export default Empty;
