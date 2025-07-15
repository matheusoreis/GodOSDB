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

  public async update(data: UpdateActorDto): Promise<ActorEntity> {
    await this.getOrFail(data.id);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Nenhum dado para atualizar foi fornecido.',
      );
    }

    const [row] = await this.knex<ActorEntity>(this.table)
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

  public async delete(data: DeleteActorDto): Promise<{ message: string }> {
    await this.getOrFail(data.id);

    const row = await this.knex<ActorEntity>(this.table)
      .where('id', data.id)
      .andWhere('accountId', data.accountId)
      .del();

    if (!row) {
      throw new NotFoundException(
        `Registro com o id ${data.id} não encontrado ou não pertence ao usuário com id ${data.accountId}.`,
      );
    }

    return {
      message: `Personagem com id ${data.id}, apagado com sucesso!`,
    };
  }
}
