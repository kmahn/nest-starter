import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserResponseDto } from '@leaf/types';
import { UserRepository } from 'src/subjects/users/domain';
import { SearchUserQuery } from '../impl';

@QueryHandler(SearchUserQuery)
export class SearchUserHandler implements IQueryHandler<SearchUserQuery> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  execute(query: SearchUserQuery): Promise<SearchUserResponseDto> {
    return this._userRepository.search(query);
  }
}
