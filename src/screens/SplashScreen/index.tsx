import * as React from 'react';
import View from 'react-native-ui-lib/view';
import Logo from '../../components/Logo';

function SplashScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Logo />
    </View>
  );
}

export default SplashScreen;
