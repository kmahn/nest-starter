import { applyDecorators, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from '@leaf/errors';
import {
  ApiExceptions,
  LoginRequestDtoImpl,
  LoginResponseDtoImpl,
} from '@leaf/swagger';
import { AuthProvider } from '@leaf/types';

export function Auth(provider: AuthProvider) {
  return applyDecorators(
    ApiResponse({ type: LoginResponseDtoImpl, status: 200 }),
    ...(provider === AuthProvider.LOCAL
      ? [
          ApiBody({ type: LoginRequestDtoImpl }),
          ApiExceptions(UserNotFoundException, InvalidPasswordException),
        ]
      : []),
    UseGuards(AuthGuard(provider)),
    HttpCode(200),
  );
}
