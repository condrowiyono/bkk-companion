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
  const [payload, setPayload] = useState({email: '', password: ''});
  const [valid, setValid] = useState({email: false, password: false});
  const isValid = valid.email && valid.password;

  const {mutate, status} = useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: (data: LoginPayload) =>
      fetcher('/login', {method: 'POST', body: JSON.stringify(data)}),
    onSuccess: data => {
      login({
        name: data.data.user.name,
        email: data.data.user.email,
        token: data.data.token,
      });
      show('Login success', {preset: 'success'});
    },
    onError: error => {
      show(`Login failed: ${error.message}`, {preset: 'failure'});
    },
  });

  return (
    <View padding-12>
      <Card>
        <TextField
          placeholder="Email"
          floatingPlaceholder
          enableErrors
          validateOnBlur
          validate={['required', 'email']}
          validationMessage={['Field is required', 'Email is invalid']}
          value={payload.email}
          validateOnChange
          onChangeText={email => setPayload({...payload, email})}
          onChangeValidity={email => setValid({...valid, email})}
        />
        <TextField
          placeholder="Password"
          secureTextEntry
          floatingPlaceholder
          enableErrors
          validateOnBlur
          validate={['required', (value: string) => value.length > 6]}
          validationMessage={['Field is required', 'Password is too short']}
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
