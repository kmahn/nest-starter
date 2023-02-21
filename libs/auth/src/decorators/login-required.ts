import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import {
  AccessTokenExpiredException,
  LoginRequiredException,
} from '@leaf/errors';
import { ApiExceptions } from '@leaf/swagger';
import { JwtGuard } from '../guards';

export const LoginRequired = applyDecorators(
  ApiHeader({ name: 'Authorization' }),
  ApiBearerAuth(),
  ApiExceptions(LoginRequiredException, AccessTokenExpiredException),
  UseGuards(JwtGuard),
);
