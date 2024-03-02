import React, {useState} from 'react';
import {View, Card, Text, TextField, Button} from 'react-native-ui-lib';
import {useMutation} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {useAuth} from '../../contexts/auth';
import {useToast} from '../../contexts/toast';
import {LoginPayload, LoginResponse} from '../../interfaces/login';

const Login = () => {
  const {login, user} = useAuth();
  const {show} = useToast();
  const [payload, setPayload] = useState({employe_id: '', password: ''});
  const [valid, setValid] = useState({employe_id: false, password: false});
  const isValid = valid.employe_id && valid.password;

  const {mutate, status} = useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: data => fetcher({url: '/login', method: 'POST', data}),
    onSuccess: data => {
      if (data.token) {
        login(data.token);
        show('Login success', {preset: 'success'});
      }
    },
    onError: error => {
      show(`Login gagal: ${error.message}`, {preset: 'failure'});
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
          label="Login"
          disabled={!isValid || status === 'pending'}
          onPress={() => mutate(payload)}
        />
      </Card>
      <Card>
        <Text>User: {JSON.stringify(user)}</Text>
        <Text>Status: {JSON.stringify(status)}</Text>
      </Card>
    </View>
  );
};

export default Login;
