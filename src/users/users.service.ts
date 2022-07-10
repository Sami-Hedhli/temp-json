import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: new ObjectId(),
      name: 'Admin',
      password: 'Admin',
      email: 'sami@email.com',
    },
    {
      id: new ObjectId(),
      name: 'Arthur',
      password: 'rdr2',
      email: 'sami@emadil.com',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
