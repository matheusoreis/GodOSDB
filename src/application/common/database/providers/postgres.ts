import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

export const PostgresProvider: DynamicModule = KnexModule.forRootAsync(
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    name: 'postgres',
    useFactory: (configService: ConfigService) => ({
      config: {
        client: 'pg',
        connection: {
          host: configService.get('DB_HOST') ?? '127.0.0.1',
          port: parseInt(configService.get('DB_PORT') ?? '5432', 10),
          user: configService.get('DB_USER') ?? 'postgres',
          password: configService.get('DB_PASS') ?? 'postgres',
          database: configService.get('DB_NAME') ?? 'postgres',
        },
        searchPath: [configService.get('DB_SCHEMA') ?? 'public'],
        pool: {
          min: parseInt(configService.get('DB_POOL_MIN') ?? '1', 10),
          max: parseInt(configService.get('DB_POOL_MAX') ?? '5', 10),
        },
      },
    }),
  },
  'postgres',
);
