import { AggregateRoot } from '@nestjs/cqrs';
import { IdType, UserEntity, UserRole } from '@leaf/types';
import { ObjectId } from 'mongodb';

export class UserAggregate extends AggregateRoot implements UserEntity {
  _id: string | ObjectId;
  role: UserRole;
  email?: string;
  nickname?: string | null;
  phone?: string;
  auth?: IdType | null;
  updatedAt?: Date;
  createdAt?: Date;
  accessDate?: Date | null;

  constructor({
    _id = new ObjectId(),
    role,
    email,
    nickname,
    phone,
    auth,
    updatedAt,
    createdAt,
    accessDate,
  }: Partial<UserEntity>) {
    super();
    this._id = _id;
    this.role = role;
    this.email = email;
    this.nickname = nickname;
    this.phone = phone;
    this.auth = auth;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.accessDate = accessDate;
  }
}
