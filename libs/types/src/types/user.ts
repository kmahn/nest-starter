import { IdType } from './base';

export enum UserRole {
  MEMBER = 'member',
  OPERATOR = 'operator',
  ADMIN = 'admin',
}

export const USER_ROLES = Object.values(UserRole);
export const OPERATOR_ROLES = [UserRole.ADMIN, UserRole.OPERATOR];

export type UserProfile = {
  _id: IdType;
  role: UserRole;
};
