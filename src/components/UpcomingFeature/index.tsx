import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native-ui-lib';

const UpcomingFeature = () => {
  return (
    <View center marginT-8>
      <Icon name="bulb" size={64} />
      <Text center marginT-16>
        Fitur ini akan hadir
      </Text>
    </View>
  );
};

export default UpcomingFeature;
