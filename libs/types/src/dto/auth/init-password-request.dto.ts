import { AuthCodeRequestType } from '@leaf/types/types';

export type InitPasswordRequestDto = {
  key: string;
  type: AuthCodeRequestType;
  code: string;
  password: string;
};
