import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRuleDto } from './dtos/create';
import { UpdateRuleDto } from './dtos/update';
import RuleProvider from './provider';

@Controller('rule')
export default class RuleController {
  constructor(private readonly provider: RuleProvider) {}

  @Get()
  public async getAll() {
    return await this.provider.getAll();
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.provider.getById(id);
  }

  @Post()
  public async create(@Body() data: CreateRuleDto) {
    return await this.provider.create(data);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRuleDto,
  ) {
    return await this.provider.update(id, data);
  }
}
