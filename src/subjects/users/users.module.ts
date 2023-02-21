import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, QueryHandlers, UsersService } from './application';
import { Repositories } from './domain';
import { UsersController } from './presentation';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
  ],
})
export class UsersModule {}
