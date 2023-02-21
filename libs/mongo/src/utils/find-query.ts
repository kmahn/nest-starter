import {
  RepositoryFilterQuery,
  RepositoryKeywordQuery,
  RepositoryPageQuery,
  RepositoryQuery,
  RepositoryQueryMapper,
  RepositorySortQuery,
} from '@leaf/repository';
import { SearchResponseDto, SortDirection } from '@leaf/types';
import mongoose, { FilterQuery, Model, PipelineStage, Query } from 'mongoose';
import { ModelName } from '../constants';
import { MongoFindOptions, MongoSearchOptions } from '../types';

async function _convertMongoKeywordQuery<Filter>(
  q: RepositoryKeywordQuery<Filter>,
  mappers: RepositoryQueryMapper<Filter>,
) {
  const queryMappers = { ...mappers, ...q?.mappers };
  const queryMapperKeys = Object.keys(queryMappers);
  if (q && queryMapperKeys.length > 0) {
    const $or = await Promise.all(
      queryMapperKeys.map(async (key) => {
        const f = {};
        f[key] = queryMappers[key] ? await queryMappers[key](q.value) : q.value;
        return f[key] !== undefined ? f : undefined;
      }),
    );
    return $or.filter((v) => !!v);
  }
  return null;
}

async function _convertMongoFilterQuery<Filter>(
  filter: RepositoryFilterQuery<Filter>,
  mappers: RepositoryQueryMapper<Filter>,
) {
  const filterKeys = Object.keys(filter || {});
  const f = {};
  await Promise.all(
    filterKeys.map(async (key) => {
      const value =
        mappers && mappers[key] ? await mappers[key](filter[key]) : filter[key];
      if (value !== undefined) f[key] = value;
    }),
  );
  return f;
}

function _convertMongoSortQuery<Sort>(sort?: RepositorySortQuery<Sort>) {
  if (sort) {
    const $sort: { [key in keyof Sort]?: SortDirection } = {};
    $sort[sort.key] = sort.direction;
    return { $sort };
  }
  return null;
}

function _convertMongoPageQuery(page?: RepositoryPageQuery) {
  if (page) {
    return [{ $limit: page.skip + page.limit }, { $skip: page.skip }];
  }
  return [];
}

async function _convertMongoQuery<Filter, Sort>(
  query?: RepositoryQuery<Filter, Sort>,
  filterQuery?: FilterQuery<any>,
): Promise<{
  countPipeline: PipelineStage[];
  searchPipeline: PipelineStage[];
}> {
  const { q, filter, mappers, sort, page } = query || {};
  let $match: { [key: string]: any } = { ...filterQuery };
  const $or = await _convertMongoKeywordQuery(q, mappers);
  const f = await _convertMongoFilterQuery(filter, mappers);

  if ($or) $match['$or'] = $or;
  $match = { ...$match, ...f };

  const countPipeline: PipelineStage[] = [{ $match }, { $count: 'total' }];
  const searchPipeline: PipelineStage[] = [{ $match }];

  const $sort = _convertMongoSortQuery(sort);
  if ($sort) searchPipeline.push($sort);

  const $page = _convertMongoPageQuery(page);
  searchPipeline.push(...$page);

  return { countPipeline, searchPipeline };
}

export async function search<
  ModelType extends Model<any>,
  ReturnType,
  Filter,
  Sort,
>(
  model: ModelType | ModelName,
  query?: RepositoryQuery<Filter, Sort>,
  options?: MongoSearchOptions,
): Promise<SearchResponseDto<ReturnType>> {
  if (typeof model === 'string') model = mongoose.model(model) as ModelType;
  const { countPipeline, searchPipeline } = await _convertMongoQuery(
    query,
    options?.filter,
  );

  const { total } = (
    await model.aggregate(countPipeline).allowDiskUse(true)
  )[0] || { total: 0 };

  let documents: any[] = await model
    .aggregate(searchPipeline)
    .allowDiskUse(true);
  if (options?.populate) {
    documents = await model.populate(documents, options.populate);
  }
  return { total, documents } as SearchResponseDto<ReturnType>;
}

export function createFindQuery<T extends Query<any, any>, ReturnType>(
  query: T,
  options?: MongoFindOptions | null,
): Promise<ReturnType> {
  if (!options) return query.lean().exec();
  if (options.populate) query.populate(options.populate);
  if (options.select) query.select(options.select);
  return options?.returnInstance ? query.exec() : query.lean().exec();
}
