import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { load } from './factories';

const validationSchema = Joi.object({
  APP_NAME: Joi.string().required(),

  // Admin
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_NICKNAME: Joi.string().required(),

  // MongoDB
  MONGO_URI: Joi.string().required(),

  // AWS SES
  AWS_SES_ACCESS_KEY: Joi.string().required(),
  AWS_SES_SECRET_KEY: Joi.string().required(),
  AWS_SES_REGION: Joi.string().required(),
  AWS_API_VERSION: Joi.string().required(),

  // Email addresses
  EMAIL_ADDRESS_NO_REPLY: Joi.string().required(),
});

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigModule {}
