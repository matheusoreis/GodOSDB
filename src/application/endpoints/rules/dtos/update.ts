import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRuleDto } from './create';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {
  @IsNumber({}, { message: 'O id da regra deve ser um número válido!' })
  @IsNotEmpty({ message: 'O id da regra deve ser informado!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  id: number;
}
