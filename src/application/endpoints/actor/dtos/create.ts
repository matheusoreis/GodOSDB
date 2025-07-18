import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateActorDto {
  @IsNumber({}, { message: 'O id do usuário deve ser um número válido!' })
  @IsNotEmpty({ message: 'O id do usuário deve ser informado!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  accountId: number;

  @IsString({ message: 'O nome deve ser um texto!' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @IsNotEmpty({ message: 'O nome da regra é obrigatório!' })
  name: string;

  @IsString({ message: 'O sprite deve ser um texto!' })
  @IsNotEmpty({ message: 'O sprite deve ser informado!' })
  sprite: string;

  @IsNumber({}, { message: 'O mapa deve ser um número válido!' })
  @IsNotEmpty({ message: 'O mapa deve ser informado!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  mapId: number;

  @IsNumber({}, { message: 'A positionX deve ser um número válido!' })
  @IsNotEmpty({ message: 'A positionX deve ser informada!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  positionX: number;

  @IsNumber({}, { message: 'A positionX deve ser um número válido!' })
  @IsNotEmpty({ message: 'A positionX deve ser informada!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  positionY: number;
}
