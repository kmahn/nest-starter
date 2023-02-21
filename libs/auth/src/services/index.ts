import { AuthService } from './auth.service';
import { BearerTokenService } from './bearer-token.service';

export * from './auth.service';
export * from './bearer-token.service';

export const Services = [BearerTokenService, AuthService];
