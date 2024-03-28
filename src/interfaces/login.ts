import {User} from './user';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token?: string;
  NIK?: string;
  refresh_token?: string;
  user?: User | null;
  employe_id?: string;
};
