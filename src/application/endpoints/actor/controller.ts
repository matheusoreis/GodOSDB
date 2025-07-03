import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateActorDto } from './dtos/create';
import { UpdateActorDto } from './dtos/update';
import ActorProvider from './provider';
import { DeleteActorDto } from './dtos/delete';

@Controller('actor')
export default class ActorController {
  constructor(private readonly provider: ActorProvider) { }

  @Get()
  public async getAll() {
    return await this.provider.getAll();
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.provider.getById(id);
  }

  @Get('account/:id')
  public async getByAccountId(@Param('id', ParseIntPipe) id: number) {
    return await this.provider.getByAccountId(id);
  }

  @Post()
  public async create(@Body() data: CreateActorDto) {
    return await this.provider.create(data);
  }

  @Patch()
  public async update(@Body() data: UpdateActorDto) {
    return await this.provider.update(data);
  }

  @Delete()
  public async delete(@Body() data: DeleteActorDto) {
    return await this.provider.delete(data);
  }
}
