import {User} from './user';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    user: User;
    token: string;
  };
};
