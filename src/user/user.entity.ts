import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  userName: string;
}
