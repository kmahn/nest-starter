import { CreatedAtBaseEntity, IdBaseEntity } from './base.entity';

export type AuthCodeEntity = IdBaseEntity &
  CreatedAtBaseEntity & {
    value: string; // otp value
    key: string; // email or phone ...;
  };
