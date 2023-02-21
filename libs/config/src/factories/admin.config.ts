import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../config-key';

export const adminConfig = registerAs(ConfigKey.ADMIN, () => ({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  nickname: process.env.ADMIN_NICKNAME,
}));
