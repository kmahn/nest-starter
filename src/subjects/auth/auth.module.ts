import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailModule } from '@leaf/email';
import { SmsModule } from '@leaf/sms';
import { AuthService } from './application';
import { EventHandlers } from './domain';
import { AuthController } from './prsentation';

@Module({
  imports: [CqrsModule, EmailModule, SmsModule],
  controllers: [AuthController],
  providers: [AuthService, ...EventHandlers],
})
export class AuthModule {}
