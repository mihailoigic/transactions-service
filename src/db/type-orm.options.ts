import 'dotenv/config';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from '../config/db.config';

const DB_CONFIG = dbConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  entities: [path.join(__dirname, '/../**/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '/migrations/*.{js,ts}')],
  migrationsTableName: 'migrations',
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
