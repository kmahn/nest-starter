import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ChangePasswordRequestDto,
  ChangeRoleRequestDto,
  FindUserResponseDto,
  IdType,
  SearchUserRequestDto,
  SearchUserResponseDto,
} from '@leaf/types';
import {
  ChangeMyPasswordCommand,
  ChangeRoleCommand,
  WithdrawUserCommand,
} from './commands';
import { FindUserQuery, SearchUserQuery } from './queries';

@Injectable()
export class UsersService {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  getUsers(dto: SearchUserRequestDto): Promise<SearchUserResponseDto> {
    return this._queryBus.execute(new SearchUserQuery(dto));
  }

  getUser(id: IdType): Promise<FindUserResponseDto> {
    return this._queryBus.execute(new FindUserQuery(id));
  }

  async changeMyPassword(dto: ChangePasswordRequestDto, userId: IdType) {
    const { oldPassword, newPassword } = dto;
    await this._commandBus.execute(
      new ChangeMyPasswordCommand(oldPassword, newPassword, userId),
    );
  }
  async withdraw(id: IdType) {
    await this._commandBus.execute(new WithdrawUserCommand(id));
  }

  async changeRole(dto: ChangeRoleRequestDto, id: string) {
    await this._commandBus.execute(new ChangeRoleCommand(id, dto.role));
  }
}
