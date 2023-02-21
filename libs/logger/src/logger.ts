import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const createLogger = (tag = '') =>
  WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env['NODE' + '_ENV'] === 'production' ? 'info' : 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(
            [(process.env.APP_NAME || '').toUpperCase(), tag]
              .filter((v) => !!v)
              .join('::'),
            {
              prettyPrint: true,
              colors: true,
            },
          ),
        ),
      }),
    ],
  });
