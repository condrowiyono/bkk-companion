import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {User} from '../interfaces/user';
import {getItem, setItem, removeItem} from '../utils/session';

type UserAuthPayload = User & {
  token: string;
};

type AuthContextType = {
  user: UserAuthPayload;
  isAuthentiacated: boolean;
  isLoading: boolean;
  login: (user: UserAuthPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    name: '',
    email: '',
    token: '',
  },
  isLoading: true,
  isAuthentiacated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserAuthPayload>({
    name: '',
    email: '',
    token: '',
  });
  const [isLoading, setLoading] = useState(true);
  const isAuthentiacated = user.token !== '';

  const login = (payload: UserAuthPayload) => {
    setUser(payload);
    setItem('user', payload);
  };

  const logout = () => {
    setUser({name: '', email: '', token: ''});
    removeItem('user');
  };

  useEffect(() => {
    setLoading(true);

    getItem('user')
      .then(savedUser => {
        if (savedUser) {
          setUser(savedUser);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{user, login, logout, isLoading, isAuthentiacated}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
