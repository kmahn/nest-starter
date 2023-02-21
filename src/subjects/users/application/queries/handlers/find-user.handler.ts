import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from '@leaf/errors';
import { UserAggregate, UserRepository } from 'src/subjects/users/domain';
import { FindUserQuery } from '../impl';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(query: FindUserQuery): Promise<UserAggregate> {
    const { id } = query;
    const document = this._userRepository.findById(id);
    if (!document) throw new UserNotFoundException();
    return document;
  }
}
