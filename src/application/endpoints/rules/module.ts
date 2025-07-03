import { Module } from '@nestjs/common';
import BcryptModule from 'src/application/common/bcrypt/module';
import RuleController from './controller';
import RuleProvider from './provider';

@Module({
  imports: [BcryptModule],
  controllers: [RuleController],
  providers: [RuleProvider],
  exports: [RuleProvider],
})
export default class RuleModule {}
