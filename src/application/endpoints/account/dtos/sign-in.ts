import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsCommonStrongPassword } from 'src/utils/strong-password';

export class SignInUserDto {
  @IsString({ message: 'O email deve ser um texto!' })
  @IsNotEmpty({ message: 'O email é um campo obrigatório!' })
  @IsEmail({}, { message: 'O formato do email está inválido!' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto!' })
  @IsNotEmpty({ message: 'A senha é um campo obrigatório!' })
  @IsCommonStrongPassword()
  password: string;
}
