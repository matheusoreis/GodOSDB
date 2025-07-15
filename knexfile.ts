import { config } from 'dotenv';
import type { Knex } from 'knex';

config();

const databases: { [key: string]: Knex.Config } = {
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      user: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'postgres',
    },
    searchPath: [process.env.DB_SCHEMA ?? 'public'],
    pool: {
      min: parseInt(process.env.DB_POOL_MIN ?? '1', 10),
      max: parseInt(process.env.DB_POOL_MAX ?? '1', 10),
    },
    migrations: {
      directory: process.env.MIGRATIONS_DIRECTORY ?? 'migrations',
      tableName: process.env.MIGRATIONS_TABLE ?? 'migrations',
      extension: process.env.MIGRATIONS_EXTENSION ?? 'ts',
    },
    seeds: {
      directory: process.env.SEED_DIRECTORY ?? 'seeds',
      extension: process.env.SEED_EXTENSION ?? 'ts',
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: `./${process.env.SQLITE_FILENAME ?? 'database'}.sqlite3`,
    },
    useNullAsDefault: true,
    migrations: {
      directory: process.env.MIGRATIONS_DIRECTORY ?? 'migrations',
      tableName: process.env.MIGRATIONS_TABLE ?? 'migrations',
      extension: process.env.MIGRATIONS_EXTENSION ?? 'ts',
    },
    seeds: {
      directory: process.env.SEED_DIRECTORY ?? 'seeds',
      extension: process.env.SEED_EXTENSION ?? 'ts',
    },
  },
};

module.exports = databases;
