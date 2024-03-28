import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import {ActivityIndicator} from 'react-native';

const Laoding = () => {
  return (
    <View flex center>
      <ActivityIndicator size="large" color={Colors.black} />
      <Text>Memuat...</Text>
    </View>
  );
};

export default Laoding;
