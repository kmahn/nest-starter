import { IQuery } from '@nestjs/cqrs';
import { IdType } from '@leaf/types';

export class FindUserQuery implements IQuery {
  constructor(public readonly id: IdType) {}
}
