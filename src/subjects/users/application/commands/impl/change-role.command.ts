import { ICommand } from '@nestjs/cqrs';
import { IdType, UserRole } from '@leaf/types';

export class ChangeRoleCommand implements ICommand {
  constructor(public readonly userId: IdType, public readonly role: UserRole) {}
}
