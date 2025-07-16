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
  public async create(@Body() body: CreateMapDto) {
    return await this.provider.create(body);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMapDto,
  ) {
    return await this.provider.update(id, body);
  }
}
