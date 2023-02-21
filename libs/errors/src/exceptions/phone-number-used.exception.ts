import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { BadRequestException } from './base.exceptions';

export class PhoneNumberUsedException extends BadRequestException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.PHONE_NUMBER_USED });
  }
}
