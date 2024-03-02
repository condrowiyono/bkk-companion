import {User} from './user';

export type LoginPayload = {
  employe_id: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token?: string;
  refresh_token?: string;
  user?: User | null;
};
