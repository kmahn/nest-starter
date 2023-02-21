import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserProfile } from '@leaf/types';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserProfile => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
