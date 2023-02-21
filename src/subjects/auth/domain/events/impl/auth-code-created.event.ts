import { IEvent } from '@nestjs/cqrs';
import { AuthCodeRequestType } from '@leaf/types';

export class AuthCodeCreatedEvent implements IEvent {
  constructor(
    public readonly key: string,
    public readonly type: AuthCodeRequestType,
    public readonly value: string,
  ) {}
}
