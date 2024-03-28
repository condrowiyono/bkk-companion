import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {User} from '../interfaces/user';
import {getItem, setItem, removeItem} from '../utils/session';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';

type UserAuthPayload = User;

type AuthContextType = {
  user: UserAuthPayload;
  userID: string;
  token: string;
  isAuthentiacated: boolean;
  isLoading: boolean;
  login: (token: string, userID: string) => void;
  updateProfile: (user: UserAuthPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    idUser: '',
    email: '',
  },
  userID: '',
  token: '',
  isLoading: true,
  isAuthentiacated: true,
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
  const [userID, setUserID] = useState('');
  const [isLoading, setLoading] = useState(true);

  const isAuthentiacated = token !== '';

  const login = (tokenPayload: string, userIDPayload: string) => {
    setToken(tokenPayload);
    setUserID(userIDPayload);

    setItem('token', tokenPayload);
    setItem('userID', userIDPayload);
  };

  const logout = () => {
    setUser({email: '', idUser: ''});
    setToken('');
    setUserID('');

    removeItem('token');
    removeItem('user');
    removeItem('userID');
  };

  const updateProfile = (userPayload: UserAuthPayload) => {
    setUser(userPayload);
    setItem('user', userPayload);
  };

  useEffect(() => {
    setLoading(true);

    getItem('token')
      .then(savedToken => {
        const decoded = jwtDecode(savedToken || '') as any;
        if (decoded.exp < dayjs().unix()) {
          logout();
          return;
        }

        if (savedToken) {
          setToken(savedToken);
          setUserID(decoded.employe_id);
        }
      })
      .catch(() => {
        console.log('No token found');
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
        userID,
        login,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
