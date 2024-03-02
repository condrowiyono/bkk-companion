import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {User} from '../interfaces/user';
import {getItem, setItem, removeItem} from '../utils/session';

type UserAuthPayload = User;

type AuthContextType = {
  user: UserAuthPayload;
  token: string;
  isAuthentiacated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  updateProfile: (user: UserAuthPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    idUser: '',
    email: '',
  },
  token: '',
  isLoading: true,
  isAuthentiacated: false,
  login: () => {},
  updateProfile: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserAuthPayload>({idUser: '', email: ''});
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(true);

  const isAuthentiacated = token !== '';

  const login = (tokenPayload: string) => {
    setToken(tokenPayload);
    setItem('token', tokenPayload);
  };

  const logout = () => {
    setUser({email: '', idUser: ''});
    setToken('');

    removeItem('token');
    removeItem('user');
  };

  const updateProfile = (userPayload: UserAuthPayload) => {
    setUser(userPayload);
    setItem('user', userPayload);
  };

  useEffect(() => {
    setLoading(true);

    getItem('token')
      .then(savedToken => {
        if (savedToken) {
          setToken(savedToken);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthentiacated,
        login,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
