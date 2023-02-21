import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllHttpExceptionFilter, validationPipe } from '@leaf/errors';
import { createLogger, LoggingInterceptor } from '@leaf/logger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { environment } from './environment';

const toCapitalize = (value: string) =>
  value
    .split(' ')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

async function bootstrap() {
  const logger = createLogger();
  const app = await NestFactory.create(AppModule, { logger });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  const appName = configService.get('APP_NAME');

  app.use(helmet());
  app.enableCors(environment.cors);
  app.useGlobalPipes(validationPipe);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllHttpExceptionFilter());

  if (process.env['NODE' + '_ENV'] !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(appName.toUpperCase())
      .setDescription(`${toCapitalize(appName)} API Document`)
      .setVersion(environment.version)
      .addTag(`${toCapitalize(appName)} APIs`)
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
  }

  await app.listen(3000, () =>
    logger.log(`🚀 Application is running on: http://localhost:${port}`),
  );
}

bootstrap();
