import { AggregateRoot } from '@nestjs/cqrs';
import { IdType, SearchResponseDto } from '@leaf/types';
import { RepositoryFilterQuery, RepositoryQuery } from '../query';

export type BaseRepository<
  Aggregate extends AggregateRoot,
  Filter,
  Sort,
  SearchResponse = Aggregate,
  FindOptions = any,
  SearchOptions = any,
> = {
  create(aggregate: Aggregate, ...args: any[]): Promise<void>;

  search(
    query?: RepositoryQuery<Filter, Sort>,
    options?: SearchOptions,
    ...args: any[]
  ): Promise<SearchResponseDto<SearchResponse>>;

  findById(
    id: IdType,
    options?: FindOptions | null,
    ...args: any[]
  ): Promise<Aggregate | null>;

  findOne(
    filter: RepositoryFilterQuery<Filter>,
    options?: FindOptions | null,
    ...args: any[]
  ): Promise<Aggregate | null>;

  updateById(
    id: IdType,
    $set: Partial<Aggregate>,
    ...args: any[]
  ): Promise<void>;

  updateOne(
    filter: RepositoryFilterQuery<Filter>,
    $set: Partial<Aggregate>,
    ...args: any[]
  ): Promise<void>;

  deleteById(id: IdType, ...args: any[]): Promise<void>;

  deleteOne(
    filter: RepositoryFilterQuery<Filter>,
    ...args: any[]
  ): Promise<void>;
};
