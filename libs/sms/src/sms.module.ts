import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@leaf/config';
import { SmsService } from './services';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
