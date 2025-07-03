import { Module } from '@nestjs/common';
import BcryptModule from 'src/application/common/bcrypt/module';
import AccountController from './controller';
import AccountProvider from './provider';

@Module({
  imports: [BcryptModule],
  controllers: [AccountController],
  providers: [AccountProvider],
  exports: [AccountProvider],
})
export default class AccountModule {}
