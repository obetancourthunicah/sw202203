export interface IUser {
  name: string;
  email: string;
  status: string; //'ACT' | 'INA' | 'BLQ';
  password?: string;
  oldPasswords?: string[];
  created: Date;
  updated: Date;
  avatar?: string;
  _id?: unknown;
}
