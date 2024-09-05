import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export default class User {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
