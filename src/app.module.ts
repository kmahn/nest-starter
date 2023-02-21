import { Module } from '@nestjs/common';
import { AuthModule } from '@leaf/auth';
import { ConfigModule } from '@leaf/config';
import { MongoModule } from '@leaf/mongo';
import { SubjectModules } from './subjects';

const LibraryModules = [AuthModule, ConfigModule, MongoModule];

@Module({
  imports: [...LibraryModules, ...SubjectModules],
})
export class AppModule {}
