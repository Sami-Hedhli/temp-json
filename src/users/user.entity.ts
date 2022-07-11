import { Expose } from 'class-transformer';
import { hashInput } from 'src/util/password';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column() name: string;

  @Expose()
  @Column({
    unique: true,
  })
  email: string;

  @Column() password: string;

  @Column() createdAt: Date;

  @Column() updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hashInput(this.password);
  }
}
