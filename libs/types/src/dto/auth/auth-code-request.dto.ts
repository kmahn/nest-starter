import { AuthCodeRequestType } from '@leaf/types/types';

export type AuthCodeRequestDto = {
  key: string;
  type: AuthCodeRequestType;
};
