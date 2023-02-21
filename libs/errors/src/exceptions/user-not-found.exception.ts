import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { NotFoundException } from './base.exceptions';

export class UserNotFoundException extends NotFoundException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.USER_NOT_FOUND });
  }
}
