import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text, Card, Avatar, Colors} from 'react-native-ui-lib';
import {useQuery} from '@tanstack/react-query';

import {getFirstAndLastNames, formatEmptyValue} from '../../utils/text';
import {fetcher} from '../../utils/fetcher';
import {User} from '../../interfaces/user';

const Profile = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetcher<User>({url: '/protected/profile'}),
  });

  const profile = useMemo(() => {
    return [
      {
        label: 'Nama',
        content: formatEmptyValue(data?.data?.Nama),
      },
      {
        label: 'NIK',
        content: formatEmptyValue(data?.data?.NIK),
      },
      {
        label: 'ID User',
        content: formatEmptyValue(data?.data?.idUser),
      },
      {
        label: 'Divisi',
        content: formatEmptyValue(data?.data?.Divisi),
      },
      {
        label: 'Jabatan',
        content: formatEmptyValue(data?.data?.kdJabatan),
      },
      {
        label: 'Email',
        content: formatEmptyValue(data?.data?.email),
      },
      {
        label: 'No Telepon',
        content: formatEmptyValue(data?.data?.notelp),
      },
    ];
  }, [data?.data]);

  return (
    <View flexG>
      <Card borderRadius={0} centerH>
        <Avatar
          backgroundColor={Colors.primary}
          labelColor={Colors.white}
          label={getFirstAndLastNames(data?.data?.Nama ?? 'Bukaka Teknik')}
        />
        <Text text60>{formatEmptyValue(data?.data?.Nama)}</Text>
        <Text>
          {!isLoading ? `NIK : ${formatEmptyValue(data?.data?.NIK)}` : '-'}
        </Text>
      </Card>
      <FlatList
        data={profile}
        keyExtractor={item => item.label}
        renderItem={({item}) => (
          <View height={48} row spread paddingH-12>
            <Text>{item.label}</Text>
            <Text style={styles.label}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});

export default Profile;
