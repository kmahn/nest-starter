import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpException } from '@leaf/errors';
import { ErrorResponseDto } from '@leaf/types';

interface HttpExceptionConstructor<T extends HttpException> {
  new (response?: Partial<ErrorResponseDto>): T;
}

export function ApiExceptions<T extends HttpException>(
  ...constructors: HttpExceptionConstructor<T>[]
) {
  const exceptions = constructors.map((ctr) => new ctr());
  const options = exceptions
    .map((exception) => {
      const example = {};
      example[exception.name] = exception.getResponse();
      return {
        status: exception.getStatus(),
        schema: {
          anyOf: [
            {
              example: exception.getResponse(),
              properties: {
                message: {
                  type: (exception.getResponse() as ErrorResponseDto).message,
                },
                status: {
                  type: exception.getStatus(),
                },
              },
            },
          ],
        },
      };
    })
    .reduce((acc, cur) => {
      const exOption = acc.find((op) => op.status === cur.status);

      if (exOption) {
        exOption.schema.anyOf = [...exOption.schema.anyOf, ...cur.schema.anyOf];
      } else {
        acc.push(cur);
      }
      return acc;
    }, []);

  return applyDecorators(...options.map((option) => ApiResponse(option)));
}
