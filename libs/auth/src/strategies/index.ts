import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

export * from './jwt.strategy';

export const Strategies = [JwtStrategy, LocalStrategy];
