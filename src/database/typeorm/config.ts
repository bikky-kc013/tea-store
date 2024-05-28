import { DataSourceOptions } from 'typeorm';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  database: 'tea_store',
  port: 3306,
  username: 'root',
  password: 'password',
  entities: [],
  migrations: [],
  synchronize: true,
  logging: false,
};
