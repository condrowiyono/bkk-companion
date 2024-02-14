import React from 'react';
import {Image} from 'react-native-ui-lib';

const sizeMap = {
  small: [100, 18],
  normal: [140, 26],
  large: [180, 32],
};

const Logo = (props: {size?: 'small' | 'large' | 'normal'}) => {
  const {size = 'normal'} = props;
  const [width, height] = sizeMap[size];

  return <Image source={require('./img/logo.png')} style={{width, height}} />;
};

export default Logo;
