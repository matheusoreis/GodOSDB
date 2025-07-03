import { ActorEntity } from "../../actor/entities/actor";

export class UserEntity {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SafeUserEntity implements Omit<UserEntity, 'password'> {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntityWithActors extends SafeUserEntity {
  actors: ActorEntity[];
}