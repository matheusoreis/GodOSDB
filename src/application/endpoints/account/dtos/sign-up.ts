import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsCommonStrongPassword } from 'src/utils/strong-password';
import { SignInUserDto } from './sign-in';

export class SignUpDto extends PickType(SignInUserDto, [
  'email',
  'password',
] as const) {
  @IsString({ message: 'A confirmação de senha deve ser um texto!' })
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória!' })
  @IsCommonStrongPassword({ message: 'A confirmação de senha está fraca!' })
  rePassword: string;
}
