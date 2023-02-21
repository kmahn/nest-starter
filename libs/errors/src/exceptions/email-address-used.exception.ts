import { ErrorMessage, ErrorResponseDto } from '@leaf/types';
import { BadRequestException } from './base.exceptions';

export class EmailAddressUsedException extends BadRequestException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({ ...response, message: ErrorMessage.EMAIL_ADDRESS_USED });
  }
}
