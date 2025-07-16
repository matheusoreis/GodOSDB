import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteActorDto {
  @IsNumber({}, { message: 'O id do usuário deve ser um número válido!' })
  @IsNotEmpty({ message: 'O id do usuário deve ser informado!' })
  @Transform(({ value }) => Number.parseInt(value, 10))
  accountId: number;
}
