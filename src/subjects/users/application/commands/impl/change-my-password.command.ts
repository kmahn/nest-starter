import { ICommand } from '@nestjs/cqrs';
import { IdType } from '@leaf/types';

export class ChangeMyPasswordCommand implements ICommand {
  constructor(
    public readonly oldPassword: string,
    public readonly newPassword: string,
    public readonly userId: IdType,
  ) {}
}
