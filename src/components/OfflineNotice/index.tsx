import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.floating}>
        <View style={styles.container}>
          <Icon
            style={{color: Colors.white}}
            name="cloud-offline-outline"
            size={24}
          />
          <Text style={{color: Colors.white}}>Tidak ada koneksi internet</Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.$iconDangerLight,
    zIndex: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 8,
  },
});

export default OfflineNotice;
