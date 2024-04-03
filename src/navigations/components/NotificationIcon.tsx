import * as React from 'react';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../types';
import {View} from 'react-native-ui-lib';
import {PressableScale} from '../../components/PressableScale';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

const SearchIcon = (props: HeaderButtonProps) => {
  const {...rest} = props;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={style.container}>
      <PressableScale
        style={style.button}
        onPress={() => navigation.navigate('Notification')}>
        <Icon name="notifications" size={24} {...rest} />
      </PressableScale>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  button: {
    padding: 8,
  },
});

export default SearchIcon;
