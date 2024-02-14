import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {
  View,
  Text,
  Card,
  Avatar,
  ListItem,
  Button,
  Colors,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {getFirstAndLastNames} from '../../utils/text';
import {useAuth} from '../../contexts/auth';
import BottomSheet from '../../components/BottomSheet';
import Logo from '../../components/Logo';
import {StyleSheet} from 'react-native';

const menuItems = [
  {title: 'Lihat Profil', icon: 'person', key: 'edit-profile'},
  {title: 'Keluar', icon: 'log-out', key: 'logout'},
];

const Account = () => {
  const {user, logout} = useAuth();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handlePress = (key: string) => {
    if (key === 'logout') {
      setBottomSheetOpen(true);
    }
  };

  return (
    <View>
      <Card style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
        <Avatar
          backgroundColor={Colors.primary}
          labelColor={Colors.white}
          label={getFirstAndLastNames(user.name)}
        />
        <Text text60>{user.name}</Text>
        <Text>{user.email}</Text>
      </Card>
      <Card borderRadius={0}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <ListItem height={48} onPress={() => handlePress(item.key)}>
              <ListItem.Part left>
                <Icon name={item.icon} size={20} />
              </ListItem.Part>
              <ListItem.Part middle containerStyle={styles.border}>
                <Text>{item.title}</Text>
              </ListItem.Part>
            </ListItem>
          )}
        />
      </Card>
      <View centerH>
        <Logo size="small" />
      </View>
      <BottomSheet
        snapPoints={['40%']}
        visible={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}>
        <Text textAlign="center" text60>
          Mau keluar dari akunmu?
        </Text>
        <Text margin text70>
          Pastikan kamu sudah menyimpan data pentingmu.
        </Text>
        <View gap-12 marginV-12>
          <Button
            style={{backgroundColor: Colors.bgPrimaryLight}}
            labelStyle={{color: Colors.primary}}
            label="Keluar"
            onPress={logout}
          />
          <Button label="Tidak" onPress={() => setBottomSheetOpen(false)} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    flex: 1,
    marginLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey50,
  },
});

export default Account;
