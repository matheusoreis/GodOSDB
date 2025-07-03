import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/module';
import AccountModule from './endpoints/account/module';
import ActorModule from './endpoints/actor/module';
import MapModule from './endpoints/map/module';
import RuleModule from './endpoints/rules/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RuleModule,
    AccountModule,
    ActorModule,
    MapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
