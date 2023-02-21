import { UserEntity } from '../../entities';
import { IdType, UserRole } from '../../types';

export interface FindUserResponseDto extends UserEntity {
  _id: string;
  role: UserRole;
  email?: string;
  nickname: string | null;
  phone?: string;
  auth: IdType;
  accessDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
