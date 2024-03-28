import * as React from 'react';
import {StyleSheet} from 'react-native';

import {PressableScale, PressableScaleProps} from '../PressableScale';
import {Colors} from 'react-native-ui-lib';

const TouchableCard = (props: PressableScaleProps) => {
  return (
    <PressableScale {...props} style={[props.style, styles.touchable]}>
      {props.children}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.$backgroundNeutral,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
});

export default TouchableCard;
