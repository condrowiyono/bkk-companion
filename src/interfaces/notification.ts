export type Notification = {
  id: number;
  topic: string | null;
  employe_id: string;
  fcm_token: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};
