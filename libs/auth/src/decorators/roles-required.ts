import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import {
  AccessTokenExpiredException,
  ForbiddenException,
  LoginRequiredException,
} from '@leaf/errors';
import { ApiExceptions } from '@leaf/swagger';
import { OPERATOR_ROLES, UserRole } from '@leaf/types';
import { JwtGuard, RolesGuard } from '../guards';

const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);

export function RolesRequired(...roles: UserRole[]) {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: `${roles.join(', ')} 자격 필요`,
    }),
    ApiBearerAuth(),
    ApiExceptions(
      LoginRequiredException,
      AccessTokenExpiredException,
      ForbiddenException,
    ),
    Roles(roles),
    UseGuards(JwtGuard, RolesGuard),
  );
}

export const OperatorRolesRequired = RolesRequired(...OPERATOR_ROLES);
