import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { BadRequestException } from './base.exceptions';

export class BadRequestDtoException extends BadRequestException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.BAD_REQUEST_DTO });
  }
}
