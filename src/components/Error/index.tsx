import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native-ui-lib';

const Error = () => {
  return (
    <View centerH centerV flex>
      <Icon name="alert-circle-outline" size={64} />
      <Text center marginT-16>
        Terjadi Kesalahan
      </Text>
    </View>
  );
};

export default Error;
