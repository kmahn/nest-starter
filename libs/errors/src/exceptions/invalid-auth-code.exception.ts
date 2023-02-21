import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { BadRequestException } from './base.exceptions';

export class InvalidAuthCodeException extends BadRequestException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.INVALID_AUTH_CODE });
  }
}
