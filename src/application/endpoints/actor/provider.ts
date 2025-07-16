import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateActorDto } from './dtos/create';
import { UpdateActorDto } from './dtos/update';
import { ActorEntity } from './entities/actor';
import { DeleteActorDto } from './dtos/delete';

@Injectable()
export default class ActorProvider {
  private readonly table: string = 'actors';

  constructor(@InjectConnection('sqlite') private readonly knex: Knex) {}

  private async getOrFail(id: number): Promise<ActorEntity> {
    const row = await this.knex<ActorEntity>(this.table)
      .where('id', id)
      .first();
    if (!row) {
      throw new NotFoundException(`Registro com o id ${id} não encontrado.`);
    }

    return row;
  }

  public async getAll(): Promise<ActorEntity[]> {
    return await this.knex<ActorEntity>(this.table).select('*');
  }

  public async getById(id: number): Promise<ActorEntity> {
    return await this.getOrFail(id);
  }

  public async getByAccountId(id: number): Promise<ActorEntity[]> {
    return await this.knex<ActorEntity>(this.table).where('accountId', id);
  }

  public async create(data: CreateActorDto): Promise<ActorEntity> {
    const [row] = await this.knex<ActorEntity>(this.table)
      .insert({
        ...data,
        directionX: 0,
        directionY: 1,
        ruleId: 1,
      })
      .returning('*');

    return row;
  }

  public async update(id: number, data: UpdateActorDto): Promise<ActorEntity> {
    await this.getOrFail(id);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Nenhum dado para atualizar foi fornecido.',
      );
    }

    const [row] = await this.knex<ActorEntity>(this.table)
      .where('id', id)
      .update({ ...data, updatedAt: new Date() })
      .returning('*');
    if (!row) {
      throw new BadRequestException(
        `Falha ao atualizar o registro com id ${id}`,
      );
    }

    return row;
  }

  public async delete(
    id: number,
    body: DeleteActorDto,
  ): Promise<ActorEntity[]> {
    await this.getOrFail(id);

    const row = await this.knex<ActorEntity>(this.table)
      .where('id', id)
      .andWhere('accountId', body.accountId)
      .del();

    if (!row) {
      throw new NotFoundException(
        `Registro com o id ${id} não encontrado ou não pertence ao usuário com id ${body.accountId}.`,
      );
    }

    return await this.getByAccountId(body.accountId);
  }
}
