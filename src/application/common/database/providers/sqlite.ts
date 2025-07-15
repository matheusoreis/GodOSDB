import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

export const SqliteProvider: DynamicModule = KnexModule.forRootAsync(
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    name: 'sqlite',
    useFactory: (configService: ConfigService) => ({
      config: {
        client: 'sqlite3',
        connection: {
          filename: `./${process.env.SQLITE_FILENAME ?? 'database'}.sqlite3`,
        },
        useNullAsDefault: true,
        pool: {
          min: parseInt(configService.get('DB_POOL_MIN') ?? '1', 10),
          max: parseInt(configService.get('DB_POOL_MAX') ?? '5', 10),
        },
      },
    }),
  },
  'sqlite',
);
