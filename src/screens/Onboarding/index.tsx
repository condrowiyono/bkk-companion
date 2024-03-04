import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Image, View} from 'react-native-ui-lib';
import {NavigationProp} from '../../navigations/types';
import {Dimensions} from 'react-native';

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
      <Image
        source={require('./img/onboard.png')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
      <Button
        label="Lanjutkan"
        onPress={() => navigation.navigate('Login')}
        style={{
          position: 'absolute',
          bottom: 24,
          width: '80%',
        }}
      />
    </View>
  );
}

export default SplashScreen;
