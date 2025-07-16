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
  constructor(private readonly provider: ActorProvider) {}

  @Post()
  public async create(@Body() data: CreateActorDto) {
    return await this.provider.create(data);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateActorDto,
  ) {
    return await this.provider.update(id, body);
  }

  @Delete(':id')
  public async delete(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteActorDto,
  ) {
    return await this.provider.delete(id, body);
  }
}
