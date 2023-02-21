import { ChangeMyPasswordHandler } from './change-password.handler';
import { ChangeRoleHandler } from './change-role.handler';
import { WithdrawUserHandler } from './withdraw-user.handler';

export const CommandHandlers = [
  ChangeMyPasswordHandler,
  ChangeRoleHandler,
  WithdrawUserHandler,
];
