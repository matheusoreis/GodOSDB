import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateRuleDto } from './dtos/create';
import { UpdateRuleDto } from './dtos/update';
import { RuleEntity } from './entities/rule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export default class RuleProvider {
  private readonly table: string = 'rules';

  constructor(@InjectConnection('sqlite') private readonly knex: Knex) {}

  private async getOrFail(id: number): Promise<RuleEntity> {
    const row = await this.knex<RuleEntity>(this.table).where('id', id).first();
    if (!row) {
      throw new NotFoundException(`Registro com o id ${id} não encontrado.`);
    }

    return row;
  }

  public async getAll(): Promise<RuleEntity[]> {
    return await this.knex<RuleEntity>(this.table).select('*');
  }

  public async getById(id: number): Promise<RuleEntity> {
    return await this.getOrFail(id);
  }

  public async create(data: CreateRuleDto): Promise<RuleEntity> {
    const [row] = await this.knex<RuleEntity>(this.table)
      .insert(data)
      .returning('*');

    return row;
  }

  public async deleteById(id: number): Promise<number> {
    await this.getOrFail(id);

    const deletedCount = await this.knex<RuleEntity>(this.table)
      .where('id', id)
      .del();
    if (deletedCount === 0) {
      throw new BadRequestException(
        `Nenhum registro foi deletado com id: ${id}`,
      );
    }

    return id;
  }

  public async update(id: number, data: UpdateRuleDto): Promise<RuleEntity> {
    await this.getOrFail(id);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Nenhum dado para atualizar foi fornecido.',
      );
    }

    const [row] = await this.knex<RuleEntity>(this.table)
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
}
