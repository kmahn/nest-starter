import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserProfile } from '@leaf/types';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string): Promise<UserProfile> {
    return this._authService.validateLocalAuth(email, password);
  }
}
