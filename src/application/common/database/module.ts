import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexProvider } from './provider';

@Module({
  imports: [ConfigModule, KnexProvider],
  exports: [KnexModule],
})
export class DatabaseModule {}
