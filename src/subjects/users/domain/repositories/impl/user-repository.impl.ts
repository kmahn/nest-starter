import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  createFindQuery,
  ModelName,
  MongoFindOptions,
  MongoSearchOptions,
  search,
  UserModel,
} from '@leaf/mongo';
import { RepositoryFilterQuery, RepositoryQuery } from '@leaf/repository';
import {
  IdType,
  SearchUserResponseDto,
  UserFilter,
  UserSort,
} from '@leaf/types';
import { QueryOptions } from 'mongoose';
import { UserAggregate } from '../../aggregates';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(ModelName.USER) readonly _userModel: UserModel) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(aggregate: UserAggregate, ...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  search(
    query?: RepositoryQuery<UserFilter, UserSort>,
    options?: MongoSearchOptions,
  ): Promise<SearchUserResponseDto> {
    return search(this._userModel, query, { ...options });
  }

  async findById(
    id: IdType,
    options?: MongoFindOptions,
  ): Promise<UserAggregate> {
    const document = await createFindQuery(
      this._userModel.findById(id),
      options,
    );
    if (!document) return null;
    return new UserAggregate(document);
  }

  async findOne(
    filter: RepositoryFilterQuery<UserFilter>,
    options?: MongoFindOptions,
  ): Promise<UserAggregate> {
    const document = await createFindQuery(
      this._userModel.findOne(filter),
      options,
    );
    if (!document) return null;
    return new UserAggregate(document);
  }

  async updateById(
    _id: IdType,
    $set: Partial<UserAggregate>,
    options?: QueryOptions,
  ): Promise<void> {
    await this._userModel.updateOne({ _id }, { $set }, options);
  }

  async updateOne(
    filter: RepositoryFilterQuery<UserFilter>,
    $set: Partial<UserAggregate>,
    options?: QueryOptions,
  ): Promise<void> {
    await this._userModel.updateOne(filter, { $set }, options);
  }

  async deleteById(_id: IdType): Promise<void> {
    await this._userModel.deleteOne({ _id });
  }

  async deleteOne(filter: RepositoryFilterQuery<UserFilter>): Promise<void> {
    await this._userModel.deleteOne(filter);
  }
}
