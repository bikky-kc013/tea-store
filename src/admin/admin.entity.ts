import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin'],
    default: 'admin',
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
