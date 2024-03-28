import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {View, TextField, Button, Text} from 'react-native-ui-lib';
import {useMutation} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {useAuth} from '../../contexts/auth';
import {LoginPayload, LoginResponse} from '../../interfaces/login';

const Login = () => {
  const {login} = useAuth();
  const [payload, setPayload] = useState({username: '', password: ''});
  const [valid, setValid] = useState({username: false, password: false});
  const isValid = valid.username && valid.password;

  const {mutate, status} = useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: data => fetcher({url: '/login', method: 'POST', data}),
    onSuccess: data => {
      if (data.token && data.employe_id) {
        login(data.token, data.employe_id);
        Toast.show({type: 'success', text1: 'Login berhasil'});
      }
    },
    onError: error => {
      Toast.show({type: 'error', text1: `Login gagal: ${error.message}`});
    },
  });

  return (
    <View padding-12>
      <View marginV-52 center>
        <Text center text40>
          Login
        </Text>
      </View>
      <TextField
        placeholder="Username / NIK"
        floatingPlaceholder
        enableErrors
        validateOnBlur
        validate={['required']}
        validationMessage={['Tidak boleh kosong']}
        value={payload.username}
        validateOnChange
        onChangeText={username => setPayload({...payload, username})}
        onChangeValidity={username => setValid({...valid, username})}
      />
      <TextField
        placeholder="Password"
        secureTextEntry
        floatingPlaceholder
        enableErrors
        validateOnBlur
        validate={['required']}
        validationMessage={['Tidak boleh kosong']}
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
    </View>
  );
};

export default Login;
