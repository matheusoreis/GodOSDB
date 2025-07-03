import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMapDto {
  @IsString({ message: 'O nome deve ser um texto!' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @IsNotEmpty({ message: 'O nome da regra é obrigatório!' })
  name: string;
}
