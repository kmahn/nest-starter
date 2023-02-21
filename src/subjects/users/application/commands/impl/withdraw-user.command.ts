import { ICommand } from '@nestjs/cqrs';
import { IdType } from '@leaf/types';

export class WithdrawUserCommand implements ICommand {
  constructor(public readonly userId: IdType) {}
}
