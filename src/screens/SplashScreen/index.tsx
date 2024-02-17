import * as React from 'react';
import View from 'react-native-ui-lib/view';
import Logo from '../../components/Logo';
import {StyleSheet} from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
