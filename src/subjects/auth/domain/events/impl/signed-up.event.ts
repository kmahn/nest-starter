import { IEvent } from '@nestjs/cqrs';
import { IdType } from '@leaf/types';

export class SignedUpEvent implements IEvent {
  constructor(public readonly userId: IdType) {}
}
