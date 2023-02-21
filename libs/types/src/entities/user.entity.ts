import { IdType, UserRole } from '@leaf/types';
import {
  CreatedAtBaseEntity,
  IdBaseEntity,
  UpdatedAtBaseEntity,
} from './base.entity';

export type UserEntity = IdBaseEntity &
  CreatedAtBaseEntity &
  UpdatedAtBaseEntity & {
    role: UserRole;
    email?: string;
    nickname?: string | null;
    phone?: string;
    auth?: IdType | null;
    accessDate?: Date | null;
  };
