import { UserProfile } from './user';

export type LoggingData = {
  user?: UserProfile;
  body?: any;
  time?: number;
  ip?: string;
  agent?: string;
  referer?: string;
  error?: string;
};
