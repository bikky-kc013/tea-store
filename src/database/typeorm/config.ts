import { DataSourceOptions } from 'typeorm';
import { User } from '../../user/user.entity';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  database: 'tea_store',
  port: 3306,
  username: 'root',
  password: 'password',
  entities: [User],
  migrations: [],
  synchronize: true,
  logging: false,
};
