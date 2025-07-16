import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { BcryptProvider } from 'src/application/common/bcrypt/provider';
import ActorProvider from '../actor/provider';
import { SignInUserDto } from './dtos/sign-in';
import { SignUpDto } from './dtos/sign-up';
import {
  SafeUserEntity,
  UserEntity,
  UserEntityWithActors,
} from './entities/user';

@Injectable()
export default class AccountProvider {
  private readonly table: string = 'accounts';

  constructor(
    @InjectConnection('sqlite') private readonly knex: Knex,
    private readonly actorProvider: ActorProvider,
    private readonly bcrypt: BcryptProvider,
  ) {}

  private async getOrFail(id: number): Promise<UserEntity> {
    const row = await this.knex<UserEntity>(this.table).where('id', id).first();
    if (!row) {
      throw new NotFoundException(`Registro com o id ${id} não encontrado.`);
    }

    return row;
  }

  public async signIn(data: SignInUserDto): Promise<UserEntityWithActors> {
    const user: UserEntity | undefined = await this.knex<UserEntity>(this.table)
      .where('email', data.email)
      .first();

    if (!user) {
      throw new NotFoundException(
        'Ops! O email informado não está associado a um usuário!',
      );
    }

    const isPasswordValid = await this.bcrypt.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Ops! A Senha informada está incorreta!');
    }

    var actors = await this.actorProvider.getByAccountId(user.id);

    const { password, ...safeUser } = user;
    return {
      ...safeUser,
      actors,
    };
  }

  public async signUp(data: SignUpDto): Promise<SafeUserEntity> {
    if (data.password != data.rePassword) {
      throw new BadRequestException('As senhas não coincidem.');
    }

    const existing = await this.knex<UserEntity>(this.table)
      .where('email', data.email)
      .first();

    if (existing) {
      throw new UnauthorizedException('Este e-mail já está em uso.');
    }

    const hashPassword = await this.bcrypt.hashPassword(data.password);

    const [row] = await this.knex<UserEntity>(this.table)
      .insert({
        email: data.email,
        password: hashPassword,
      })
      .returning(['id', 'email', 'createdAt', 'updatedAt']);

    return row;
  }
}
