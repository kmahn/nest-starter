export type QueryKey<T> = string & keyof T;

export type QueryValue =
  | string
  | number
  | boolean
  | ReadonlyArray<string | number | boolean>;

export type KeywordQuery = {
  _q?: string;
};

export type FilterQuery<T> = {
  [key in QueryKey<T>]?: QueryValue;
};

export type Query<T> = KeywordQuery & FilterQuery<T>;

export type PageQuery = {
  _limit?: number;
  _skip?: number;
};

export const SORT_QUERY_DELIMITER = ':::';
export type SortQueryDelimiter = typeof SORT_QUERY_DELIMITER;
export type SortDirection = -1 | 1;
export type SortValue<T> =
  `${QueryKey<T>}${SortQueryDelimiter}${SortDirection}`;
export type SortQuery<T> = {
  _sort?: SortValue<T>;
};

export type SearchRequestDto<Filter, Sort> = Query<Filter> &
  SortQuery<Sort> &
  PageQuery;
