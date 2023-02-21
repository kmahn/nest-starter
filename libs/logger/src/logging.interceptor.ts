import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { LoggingData } from '@leaf/types';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url, user, headers } = request;
    const ip =
      headers['x-real-ip'] ||
      headers['x-forwarded-for'] ||
      request.connection?.remoteAddress;
    const agent = headers['user-agent'];
    const referer = headers['referer'];
    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;
        const loggingMessage = this._toJson({
          user,
          time,
          ip,
          agent,
          referer,
        });
        Logger.log(`${method} ${url} - ${time}ms\n\t${loggingMessage}`);
      }),
    );
  }

  private _toJson(loggingData: LoggingData): string {
    Object.keys(loggingData).forEach((key) => {
      if (loggingData[key] === undefined) delete loggingData[key];
    });
    return JSON.stringify(loggingData);
  }
}
