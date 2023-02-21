import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../domain';
import { ChangeRoleCommand } from '../impl';

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(command: ChangeRoleCommand): Promise<void> {
    const { userId, role } = command;
    await this._userRepository.updateById(userId, { role });
  }
}
