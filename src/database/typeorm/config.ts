import { User } from '../../user/user.entity';
import { Admin } from '../../admin/admin.entity';
import { DataSourceOptions } from 'typeorm';
import { Category } from '../../product/category/category.entity';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  database: 'tea_store',
  port: 3306,
  username: 'root',
  password: 'password',
  entities: [User, Admin, Category],
  migrations: [],
  synchronize: true,
  logging: false,
};
