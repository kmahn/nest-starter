import { AuthCodeCreatedHandler } from './auth-code-created.handler';
import { SignedUpHandler } from './signed-up.handler';

export const EventHandlers = [AuthCodeCreatedHandler, SignedUpHandler];
