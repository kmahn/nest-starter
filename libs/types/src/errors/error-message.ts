export enum ErrorMessage {
  // base error message
  BAD_GATEWAY = 'BAD_GATEWAY',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
  FORBIDDEN = 'FORBIDDEN',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  GONE = 'GONE',
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP_VERSION_NOT_SUPPORTED',
  I_AM_A_TEAPOT = 'I_AM_A_TEAPOT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  NOT_FOUND = 'NOT_FOUND',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',

  // application error message
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  BAD_REQUEST_DTO = 'BAD_REQUEST_DTO',
  EMAIL_ADDRESS_USED = 'EMAIL_ADDRESS_USED',
  INVALID_AUTH_CODE = 'INVALID_AUTH_CODE',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED',
  PHONE_NUMBER_USED = 'PHONE_NUMBER_USED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  WITHDRAWN_USER = 'WITHDRAWN_USER',
}
