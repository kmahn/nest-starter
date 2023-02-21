import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../config-key';

export const emailAddressConfig = registerAs(ConfigKey.EMAIL_ADDRESS, () => ({
  noReply: process.env.EMAIL_ADDRESS_NO_REPLY,
}));
