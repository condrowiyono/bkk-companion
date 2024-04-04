import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {NavigationProp} from '../../navigations/types';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

function Onboarding() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={require('./img/onboard.png')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
      <View style={styles.cta}>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text center>Tentang Perusahaan</Text>
        </TouchableOpacity>
        <Button
          style={{width: '100%'}}
          label="Lanjutkan"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cta: {
    position: 'absolute',
    bottom: 24,
    gap: 12,
  },
});

export default Onboarding;
