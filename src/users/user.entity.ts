import { Expose } from 'class-transformer';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
