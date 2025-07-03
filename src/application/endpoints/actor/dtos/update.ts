import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateActorDto } from './create';

export class UpdateActorDto extends PartialType(CreateActorDto) {
  @IsNumber({}, { message: 'O id do personagem deve ser um número válido!' })
  @IsNotEmpty({ message: 'O id do personagem deve ser informado!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  id: number;

  @IsNumber({}, { message: 'O id do personagem deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  world: number;

  @IsNumber({}, { message: 'O id do mundo deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  worldId: number;

  @IsNumber({}, { message: 'A direção em X deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  directionX: number;

  @IsNumber({}, { message: 'A direção em Y deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  directionY: number;

  @IsNumber({}, { message: 'A posição em X deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  positionX: number;

  @IsNumber({}, { message: 'A posição em Y deve ser um número válido!' })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  positionY: number;
}
