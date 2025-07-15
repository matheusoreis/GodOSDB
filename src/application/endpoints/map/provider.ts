import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateMapDto } from './dtos/create';
import { UpdateMapDto } from './dtos/update';
import { MapEntity } from './entities/map';

@Injectable()
export default class MapProvider {
  private readonly table: string = 'maps';

  constructor(@InjectConnection('sqlite') private readonly knex: Knex) {}

  private async getOrFail(id: number): Promise<MapEntity> {
    const row = await this.knex<MapEntity>(this.table).where('id', id).first();
    if (!row) {
      throw new NotFoundException(`Registro com o id ${id} não encontrado.`);
    }

    return row;
  }

  public async getAll(): Promise<MapEntity[]> {
    return await this.knex<MapEntity>(this.table).select('*');
  }

  public async getById(id: number): Promise<MapEntity> {
    return await this.getOrFail(id);
  }

  public async create(data: CreateMapDto): Promise<MapEntity> {
    const [row] = await this.knex<MapEntity>(this.table)
      .insert(data)
      .returning('*');

    return row;
  }

  public async deleteById(id: number): Promise<number> {
    await this.getOrFail(id);

    const deletedCount = await this.knex<MapEntity>(this.table)
      .where('id', id)
      .del();
    if (deletedCount === 0) {
      throw new BadRequestException(
        `Nenhum registro foi deletado com id: ${id}`,
      );
    }

    return id;
  }

  public async update(data: UpdateMapDto): Promise<MapEntity> {
    await this.getOrFail(data.id);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Nenhum dado para atualizar foi fornecido.',
      );
    }

    const [row] = await this.knex<MapEntity>(this.table)
      .where('id', data.id)
      .update({ ...data, updatedAt: new Date() })
      .returning('*');
    if (!row) {
      throw new BadRequestException(
        `Falha ao atualizar o registro com id ${data.id}`,
      );
    }

    return row;
  }
}
