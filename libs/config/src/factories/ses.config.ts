import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../config-key';

export const sesConfig = registerAs(ConfigKey.SES, () => ({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_SECRET_KEY,
  region: process.env.AWS_SES_REGION,
  apiVersion: process.env.AWS_SES_VERSION,
}));
