import { User } from 'src/users/user.entity';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('bins')
export class Bin {
  @ObjectIdColumn() _id: ObjectID;

  @Column() name: string;

  @Column() content: JSON;

  @Column() createdAt: Date;

  @Column() expirationDate: number;

  @Column() updatedAt: Date;

  @Column({ default: false }) isExpired: boolean;

  @Column({ default: false }) isPrivate: boolean;

  @Column({ default: false }) isDeleted: boolean;

  @Column({ default: 9999 }) readCount: number;

  @ManyToOne(() => User, (User) => User._id)
  @Column()
  userId: string;

  constructor(bin: Bin) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDeleted = false;
    this.isExpired = false;
    this.readCount = 9999;
    Object.assign(this, bin);
  }
  @BeforeInsert()
  @BeforeUpdate()
  transformExpirationDate() {
    this.expirationDate = new Date(this.expirationDate).getTime();
  }
}
