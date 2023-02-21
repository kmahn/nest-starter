import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { UnauthorizedException } from './base.exceptions';

export class InvalidPasswordException extends UnauthorizedException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.INVALID_PASSWORD });
  }
}
