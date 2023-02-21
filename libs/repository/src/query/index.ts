import { IQuery } from '@nestjs/cqrs';
import {
  QueryKey,
  SearchRequestDto,
  SortDirection,
  SortValue,
  SORT_QUERY_DELIMITER,
} from '@leaf/types';

export type RepositoryFilterQuery<T> = {
  [key in QueryKey<T>]?: any;
};

export type RepositoryQueryMapper<T> = {
  [key in QueryKey<T>]?: (v: any) => Promise<any> | any | null;
};

export type RepositoryKeywordQuery<T> = {
  value: string;
  mappers?: RepositoryQueryMapper<T> | null;
};

export type RepositorySortQuery<T> = {
  key: QueryKey<T>;
  direction: SortDirection;
  mappers?: RepositoryQueryMapper<T> | null;
};

export type RepositoryPageQuery = {
  limit: number;
  skip: number;
};

export type RepositoryQuery<Filter, Sort> = {
  q?: RepositoryKeywordQuery<Filter>;
  filter?: RepositoryFilterQuery<Filter> & { [key: string]: any };
  mappers?: RepositoryQueryMapper<Filter> | null;
  page?: RepositoryPageQuery;
  sort?: RepositorySortQuery<Sort>;
};

export abstract class BaseSearchQuery<Filter, Sort>
  implements IQuery, RepositoryQuery<Filter, Sort>
{
  q?: RepositoryKeywordQuery<Filter>;
  filter?: RepositoryFilterQuery<Filter> & { [key: string]: any };
  mappers?: RepositoryQueryMapper<Filter> | null;
  page?: RepositoryPageQuery;
  sort?: RepositorySortQuery<Sort>;

  constructor(
    dto?: SearchRequestDto<Filter, Sort>,
    defaultOptions?: { limit: number; sort?: SortValue<Sort> },
  ) {
    this._convertKeywordQuery(dto);
    this._convertFilterQuery(dto);
    this._convertSortQuery(dto, defaultOptions?.sort);
    this._convertPageQuery(dto, defaultOptions?.limit);
  }

  protected abstract createFilterMappers(): RepositoryQueryMapper<Filter> | null;
  protected abstract createSortMappers(): RepositoryQueryMapper<Sort> | null;
  protected createKeywordQueryMappers(): RepositoryQueryMapper<Filter> | null {
    return this.createFilterMappers();
  }

  private _convertKeywordQuery(dto?: SearchRequestDto<Filter, Sort>): void {
    if (!dto?._q) return;
    this.q = {
      value: dto._q,
      mappers: this.createKeywordQueryMappers(),
    };
  }

  private _convertFilterQuery(dto?: SearchRequestDto<Filter, Sort>) {
    if (!dto) return;
    this.filter = Object.keys(dto)
      .filter((key) => !['_q', '_limit', '_skip', '_sort'].includes(key))
      .reduce((acc, key) => {
        acc[key] = dto[key];
        return acc;
      }, {});

    this.mappers = this.createFilterMappers()
      ? this.createFilterMappers()
      : null;
  }

  private _convertSortQuery(
    dto?: SearchRequestDto<Filter, Sort>,
    defaultSort?: SortValue<Sort>,
  ) {
    if (!dto) return;

    const sort = dto._sort ?? defaultSort;
    if (!sort) return;

    const [key, direction] = sort.split(SORT_QUERY_DELIMITER);
    this.sort = {
      key: key as QueryKey<Sort>,
      direction: +direction as SortDirection,
      mappers: this.createSortMappers(),
    };
  }

  private _convertPageQuery(
    dto?: SearchRequestDto<Filter, Sort>,
    defaultLimit = 0,
  ) {
    const { _limit, _skip } = dto || {};
    const skip = _skip ? +_skip : 0;
    const limit = _limit ? +_limit : defaultLimit;
    if (isNaN(limit) || limit <= 0) return;
    this.page = { limit, skip: isNaN(skip) || skip <= 0 ? 0 : skip };
  }
}
