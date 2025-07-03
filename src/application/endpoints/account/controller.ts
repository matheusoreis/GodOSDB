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

  @Get()
  public async getAll() {
    return await this.provider.getAll();
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.provider.getById(id);
  }

  @Post('sign-in')
  public async signIn(@Body() data: SignInUserDto) {
    return await this.provider.signIn(data);
  }

  @Post('sign-up')
  public async signUp(@Body() data: SignUpDto) {
    return await this.provider.signUp(data);
  }
}
