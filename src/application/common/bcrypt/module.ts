import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BcryptProvider } from './provider';

@Module({
  imports: [ConfigModule],
  providers: [BcryptProvider],
  exports: [BcryptProvider],
})
export default class BcryptModule {}
