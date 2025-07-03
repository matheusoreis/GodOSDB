import { Module } from '@nestjs/common';
import BcryptModule from 'src/application/common/bcrypt/module';
import ActorController from './controller';
import ActorProvider from './provider';

@Module({
  imports: [BcryptModule],
  controllers: [ActorController],
  providers: [ActorProvider],
  exports: [ActorProvider],
})
export default class ActorModule {}
