import {
  AuthProvider,
  CreatedAtBaseEntity,
  IdBaseEntity,
  IdType,
  UpdatedAtBaseEntity,
} from '@leaf/types';

export type AuthEntity = IdBaseEntity &
  CreatedAtBaseEntity &
  UpdatedAtBaseEntity & {
    provider: AuthProvider;
    providerId: string;
    hashedPassword?: string;
    user: IdType;
  };
