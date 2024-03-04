import React, {useState} from 'react';
import {View, Card, TextField, Button} from 'react-native-ui-lib';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {useAuth} from '../../contexts/auth';
import {LoginPayload, LoginResponse} from '../../interfaces/login';

const Login = () => {
  const {login} = useAuth();
  const [payload, setPayload] = useState({employe_id: '', password: ''});
  const [valid, setValid] = useState({employe_id: false, password: false});
  const isValid = valid.employe_id && valid.password;

  const {mutate, status} = useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: data => fetcher({url: '/login', method: 'POST', data}),
    onSuccess: data => {
      if (data.token) {
        login(data.token);
        Toast.show({
          type: 'success',
          text1: 'Login berhasil',
          visibilityTime: 3000,
        });
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: `Login gagal: ${error.message}`,
        visibilityTime: 3000,
      });
    },
  });

  return (
    <View padding-12>
      <Card>
        <TextField
          placeholder="NIK"
          floatingPlaceholder
          enableErrors
          validateOnBlur
          validate={['required']}
          validationMessage={['Tidak boleh kosong']}
          value={payload.employe_id}
          validateOnChange
          onChangeText={employe_id => setPayload({...payload, employe_id})}
          onChangeValidity={employe_id => setValid({...valid, employe_id})}
        />
        <TextField
          placeholder="Password"
          secureTextEntry
          floatingPlaceholder
          enableErrors
          validateOnBlur
          validate={['required', (value: string) => value.length > 5]}
          validationMessage={['Tidak boleh kosong', 'Minimal 6 karakter']}
          validateOnChange
          value={payload.password}
          onChangeText={password => setPayload({...payload, password})}
          onChangeValidity={password => setValid({...valid, password})}
        />
        <Button
          label={status === 'pending' ? 'Loading...' : 'Login'}
          disabled={!isValid || status === 'pending'}
          onPress={() => mutate(payload)}
        />
      </Card>
    </View>
  );
};

export default Login;
