import { ConfigFactory } from '@nestjs/config';
import { adminConfig } from './admin.config';
import { appConfig } from './app.config';
import { emailAddressConfig } from './email-address.config';
import { jwtConfig } from './jwt.config';
import { nCloudConfig } from './n-cloud.config';
import { sesConfig } from './ses.config';

export * from './admin.config';
export * from './app.config';
export * from './email-address.config';
export * from './jwt.config';
export * from './n-cloud.config';
export * from './ses.config';

export const load: ConfigFactory[] = [
  adminConfig,
  appConfig,
  emailAddressConfig,
  jwtConfig,
  nCloudConfig,
  sesConfig,
];
