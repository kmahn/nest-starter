import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { UnauthorizedException } from './base.exceptions';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.ACCESS_TOKEN_EXPIRED });
  }
}
