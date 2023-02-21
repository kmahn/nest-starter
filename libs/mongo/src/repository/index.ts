import { AggregateRoot } from '@nestjs/cqrs';
import { BaseRepository } from '@leaf/repository';
import { MongoFindOptions, MongoSearchOptions } from '../types';

export type MongoRepository<
  Aggregate extends AggregateRoot,
  Filter,
  Sort,
  SearchResponse = Aggregate,
> = BaseRepository<
  Aggregate,
  Filter,
  Sort,
  SearchResponse,
  MongoFindOptions,
  MongoSearchOptions
>;
