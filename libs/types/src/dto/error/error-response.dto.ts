import { ErrorMessage } from '../../errors';

export type ErrorResponseDto<T = any> = {
  statusCode: number;
  message?: ErrorMessage;
  data?: T;
};
