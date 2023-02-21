import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../config-key';

export const appConfig = registerAs(ConfigKey.APP, () => ({
  appName: process.env.APP_NAME,
}));
