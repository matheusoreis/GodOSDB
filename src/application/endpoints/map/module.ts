import { Module } from '@nestjs/common';
import BcryptModule from 'src/application/common/bcrypt/module';
import MapController from './controller';
import MapProvider from './provider';

@Module({
  imports: [BcryptModule],
  controllers: [MapController],
  providers: [MapProvider],
  exports: [MapProvider],
})
export default class MapModule {}
