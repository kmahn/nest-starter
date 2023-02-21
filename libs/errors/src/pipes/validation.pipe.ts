import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BadRequestDtoException } from '../exceptions';

export const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors: ValidationError[] = []) =>
    new BadRequestDtoException({
      data: errors.map((error) => ({
        name: error.property,
        value: error.value,
        constraints: error.constraints,
      })),
    }),
});
