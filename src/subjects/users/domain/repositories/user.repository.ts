import { MongoRepository } from '@leaf/mongo/repository';
import { FindUserResponseDto, UserFilter, UserSort } from '@leaf/types';
import { UserAggregate } from '../aggregates';

export type UserRepository = MongoRepository<
  UserAggregate,
  UserFilter,
  UserSort,
  FindUserResponseDto
>;

export const UserRepository = Symbol('UserRepository');
