import { UserEntity } from '../../entities';
import { SearchRequestDto } from '../shared';

export type UserFilterKey = '_id' | 'email' | 'nickname' | 'phone' | 'role';
export type UserFilter = Pick<UserEntity, UserFilterKey>;
export type UserSortKey = 'nickname' | 'createdAt';
export type UserSort = Pick<UserEntity, UserSortKey>;

export type SearchUserRequestDto = SearchRequestDto<UserFilter, UserSort>;
