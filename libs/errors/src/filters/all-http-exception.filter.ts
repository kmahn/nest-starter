import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorMessage, ErrorResponseDto, LoggingData } from '@leaf/types';
import {
  AccessTokenExpiredException,
  createHttpException,
  HttpException,
  LoginRequiredException,
} from '../exceptions';

@Catch()
export class AllHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // super.catch(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { message } = request.authInfo || {};

    if (message === 'jwt expired') {
      exception = new AccessTokenExpiredException();
    } else if (message === 'No auth token') {
      exception = new LoginRequiredException();
    } else if (!(exception instanceof HttpException)) {
      exception = createHttpException(
        exception.status || exception.statusCode,
        (exception.status || exception.statusCode) === 401
          ? { message: ErrorMessage.UNAUTHORIZED }
          : exception,
      );
    }

    const { method, url, body, user, headers } = request;
    const ip =
      headers['x-real-ip'] ||
      headers['x-forwarded-for'] ||
      request.connection?.remoteAddress;
    const agent = headers['user-agent'];
    const referer = headers['referer'];

    const loggingMessage = this._toJson({
      user,
      body,
      ip,
      agent,
      referer,
      error: String(exception),
    });
    Logger.error(`${method} ${url}\n\t${loggingMessage}`);

    const responseBody: ErrorResponseDto = {
      ...exception.getResponse(),
      statusCode: exception.getStatus(),
    };

    response.status(exception.status).json(responseBody);
  }

  private _toJson(loggingData: LoggingData): string {
    Object.keys(loggingData).forEach((key) => {
      if (loggingData[key] === undefined) delete loggingData[key];
    });
    return JSON.stringify(loggingData);
  }
}
