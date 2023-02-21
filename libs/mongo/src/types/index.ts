import { FilterQuery, PopulateOptions } from 'mongoose';

export type MongoPopulateOptions = {
  populate?: PopulateOptions[];
};

export type MongoFindOptions = MongoPopulateOptions & {
  select?: string | any;
  returnInstance?: boolean;
};

export type MongoSearchOptions = MongoPopulateOptions & {
  filter?: FilterQuery<any>;
};
