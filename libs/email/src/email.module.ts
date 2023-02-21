import { Module } from '@nestjs/common';
import { ConfigModule } from '@leaf/config';
import { EmailService } from './services';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
