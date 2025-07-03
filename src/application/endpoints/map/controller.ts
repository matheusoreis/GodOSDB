import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMapDto } from './dtos/create';
import { UpdateMapDto } from './dtos/update';
import MapProvider from './provider';

@Controller('map')
export default class MapController {
  constructor(private readonly provider: MapProvider) {}

  @Get()
  public async getAll() {
    return await this.provider.getAll();
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.provider.getById(id);
  }

  @Post()
  public async create(@Body() data: CreateMapDto) {
    return await this.provider.create(data);
  }

  @Patch()
  public async update(@Body() data: UpdateMapDto) {
    return await this.provider.update(data);
  }
}
