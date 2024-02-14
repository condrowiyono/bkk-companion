import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native-ui-lib';
import Logo from '../../components/Logo';
import {NavigationProp} from '../../navigations/types';

function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}>
      <Text>Onboarding</Text>
      <Logo />
      <Button label="Lanjutkan" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default SplashScreen;
