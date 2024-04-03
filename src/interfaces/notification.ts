import {StackList} from '../navigations/types';

export type Notification = {
  id: number;
  topic: string | null;
  employe_id: string;
  fcm_token: string;
  title: string;
  body: string;
  screen: keyof StackList;
  task_id: string;
  createdAt: string;
  updatedAt: string;
};
