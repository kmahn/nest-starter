import { HttpException as NestHttpException, HttpStatus } from '@nestjs/common';
import { createLogger } from '@leaf/logger';
import { ErrorMessage, ErrorResponseDto } from '@leaf/types';

export class HttpException extends NestHttpException {
  constructor(response: ErrorResponseDto) {
    super(response, response.statusCode);
  }

  getResponse: () => ErrorResponseDto;
}

export class BadGatewayException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.BAD_GATEWAY,
      ...response,
      statusCode: HttpStatus.BAD_GATEWAY,
    });
  }
}

export class BadRequestException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.BAD_REQUEST,
      ...response,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ConflictException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.CONFLICT,
      ...response,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class ForbiddenException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.FORBIDDEN,
      ...response,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.GATEWAY_TIMEOUT,
      ...response,
      statusCode: HttpStatus.GATEWAY_TIMEOUT,
    });
  }
}

export class GoneException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.GONE,
      ...response,
      statusCode: HttpStatus.GONE,
    });
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.HTTP_VERSION_NOT_SUPPORTED,
      ...response,
      statusCode: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    });
  }
}

export class ImATeapotException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.I_AM_A_TEAPOT,
      ...response,
      statusCode: HttpStatus.I_AM_A_TEAPOT,
    });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.INTERNAL_SERVER_ERROR,
      ...response,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.METHOD_NOT_ALLOWED,
      ...response,
      statusCode: HttpStatus.METHOD_NOT_ALLOWED,
    });
  }
}

export class NotAcceptableException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.NOT_ACCEPTABLE,
      ...response,
      statusCode: HttpStatus.NOT_ACCEPTABLE,
    });
  }
}

export class NotFoundException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.NOT_FOUND,
      ...response,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class NotImplementedException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.NOT_IMPLEMENTED,
      ...response,
      statusCode: HttpStatus.NOT_IMPLEMENTED,
    });
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.PAYLOAD_TOO_LARGE,
      ...response,
      statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
    });
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.PRECONDITION_FAILED,
      ...response,
      statusCode: HttpStatus.PRECONDITION_FAILED,
    });
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.REQUEST_TIMEOUT,
      ...response,
      statusCode: HttpStatus.REQUEST_TIMEOUT,
    });
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.SERVICE_UNAVAILABLE,
      ...response,
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.UNAUTHORIZED,
      ...response,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.UNPROCESSABLE_ENTITY,
      ...response,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(response?: Partial<ErrorResponseDto>) {
    super({
      message: ErrorMessage.UNSUPPORTED_MEDIA_TYPE,
      ...response,
      statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });
  }
}

export function createHttpException(
  status: HttpStatus,
  response?: Partial<ErrorResponseDto>,
): HttpException {
  const logger = createLogger('createHttpException');
  logger.debug(`status: ${status}, response: ${JSON.stringify(response)}`);
  switch (status) {
    case HttpStatus.BAD_GATEWAY:
      return new BadGatewayException(response);
    case HttpStatus.BAD_REQUEST:
      return new BadRequestException(response);
    case HttpStatus.CONFLICT:
      return new ConflictException(response);
    case HttpStatus.FORBIDDEN:
      return new ForbiddenException(response);
    case HttpStatus.GATEWAY_TIMEOUT:
      return new GatewayTimeoutException(response);
    case HttpStatus.GONE:
      return new GoneException(response);
    case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
      return new HttpVersionNotSupportedException(response);
    case HttpStatus.I_AM_A_TEAPOT:
      return new ImATeapotException(response);
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return new InternalServerErrorException(response);
    case HttpStatus.METHOD_NOT_ALLOWED:
      return new MethodNotAllowedException(response);
    case HttpStatus.NOT_ACCEPTABLE:
      return new NotAcceptableException(response);
    case HttpStatus.NOT_FOUND:
      return new NotFoundException(response);
    case HttpStatus.NOT_IMPLEMENTED:
      return new NotImplementedException(response);
    case HttpStatus.PAYLOAD_TOO_LARGE:
      return new PayloadTooLargeException(response);
    case HttpStatus.PRECONDITION_FAILED:
      return new PreconditionFailedException(response);
    case HttpStatus.REQUEST_TIMEOUT:
      return new RequestTimeoutException(response);
    case HttpStatus.SERVICE_UNAVAILABLE:
      return new ServiceUnavailableException(response);
    case HttpStatus.UNAUTHORIZED:
      return new UnauthorizedException(response);
    case HttpStatus.UNPROCESSABLE_ENTITY:
      return new UnprocessableEntityException(response);
    case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
      return new UnsupportedMediaTypeException(response);
    default:
      return new InternalServerErrorException(response);
  }
}
