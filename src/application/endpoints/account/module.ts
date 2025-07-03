import { Module } from '@nestjs/common';
import BcryptModule from 'src/application/common/bcrypt/module';
import AccountController from './controller';
import AccountProvider from './provider';
import ActorModule from '../actor/module';

@Module({
  imports: [BcryptModule, ActorModule],
  controllers: [AccountController],
  providers: [AccountProvider],
  exports: [AccountProvider],
})
export default class AccountModule { }
