import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SignInUserDto } from './dtos/sign-in';
import { SignUpDto } from './dtos/sign-up';
import AccountProvider from './provider';

@Controller('account')
export default class AccountController {
  constructor(private readonly provider: AccountProvider) {}

  @Post('sign-in')
  public async signIn(@Body() data: SignInUserDto) {
    return await this.provider.signIn(data);
  }

  @Post('sign-up')
  public async signUp(@Body() data: SignUpDto) {
    return await this.provider.signUp(data);
  }
}
