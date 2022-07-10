import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('bins')
export class Bin {
  @ObjectIdColumn() id: ObjectID;

  @Column() name: string;

  @Column() content: JSON;

  @Column() createdAt: Date;

  @Column() expirationDate: Date;

  @Column() isPublic: boolean;

  @Column() isDeleted: boolean;

  @Column() userId: string;

  @Column() isExpired: boolean;

  constructor(bin: Bin) {
    this.createdAt = new Date();
    Object.assign(this, bin);
  }
}
