import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { UnauthorizedException } from './base.exceptions';

export class WithdrawnUserException extends UnauthorizedException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.WITHDRAWN_USER });
  }
}
