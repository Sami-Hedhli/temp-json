import { User } from 'src/users/user.entity';
import { hashInput } from 'src/util';
import { randomBytes } from 'crypto';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';

@Entity('apikeys')
export class ApiKey {
  @ObjectIdColumn() _id: ObjectID;

  @Column() name: string;

  @Column() key: string;

  @Column() permissions: string[];

  @Column() createdAt: Date;

  @ManyToOne(() => User, (User) => User._id)
  @Column()
  userId: string;

  constructor(apiKey: ApiKey) {
    this.createdAt = new Date();
    this.permissions = ['read'];
    Object.assign(this, apiKey);
  }

  @BeforeInsert()
  async hashApiKey() {
    this.key = await hashInput(randomBytes(16).toString());
  }
}
