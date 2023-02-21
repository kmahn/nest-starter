import { toRegEx } from '@leaf/mongo';
import { BaseSearchQuery, RepositoryQueryMapper } from '@leaf/repository';
import { UserFilter, UserSort } from '@leaf/types';

export class SearchUserQuery extends BaseSearchQuery<UserFilter, UserSort> {
  protected createFilterMappers(): RepositoryQueryMapper<UserFilter> {
    return {
      email: toRegEx,
      nickname: toRegEx,
    };
  }

  protected createSortMappers(): RepositoryQueryMapper<UserSort> {
    return null;
  }
}
