import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { PostgresProvider } from './providers/postgres';
import { SqliteProvider } from './providers/sqlite';

@Module({
  imports: [ConfigModule, PostgresProvider, SqliteProvider],
  exports: [KnexModule],
})
export class DatabaseModule {}
