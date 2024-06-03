import { User } from '../../user/user.entity';
import { Admin } from '../../admin/admin.entity';
import { DataSourceOptions } from 'typeorm';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  database: 'tea_store',
  port: 3306,
  username: 'root',
  password: 'password',
  entities: [User, Admin],
  migrations: [],
  synchronize: true,
  logging: false,
};
