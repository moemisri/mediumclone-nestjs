import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
const path = require('node:path');
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    path.join(__dirname, '..', '**', '*.entity{.ts,.js}'), // Adjust the path to your entities
  ],
  migrations: [path.join(__dirname, '..', '/migrations/**/*{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
export const databaseConfig = registerAs('typeorm', () => config);
const connectionSource = new DataSource(config as DataSourceOptions);
export default connectionSource;
