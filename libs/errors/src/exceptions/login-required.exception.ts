import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { UnauthorizedException } from './base.exceptions';

export class LoginRequiredException extends UnauthorizedException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.LOGIN_REQUIRED });
  }
}
