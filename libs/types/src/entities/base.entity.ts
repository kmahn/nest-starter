import { ObjectId } from 'mongodb';
import { IdType } from '../types';
import { UserEntity } from './user.entity';

export type IdBaseEntity = {
  _id: ObjectId | string;
};

export type CreatedAtBaseEntity = {
  createdAt?: Date;
};

export type UpdatedAtBaseEntity = {
  updatedAt?: Date;
};

export type CreatorBaseEntity = {
  creator: IdType | UserEntity;
};

export type UpdaterBaseEntity = {
  updater: IdType | UserEntity;
};
