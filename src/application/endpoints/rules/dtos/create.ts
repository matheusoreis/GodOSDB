import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRuleDto {
  @IsString({ message: 'O título deve ser um texto!' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  @IsNotEmpty({ message: 'O título da regra é obrigatório!' })
  title: string;
}
