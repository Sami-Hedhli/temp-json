import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { ApiKey } from './apiKey.entity';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private apikeyRepository: MongoRepository<ApiKey>,
  ) {}

  async createApiKey(apiKey): Promise<ApiKey> {
    return await this.apikeyRepository.save(new ApiKey(apiKey));
  }

  async findOne(userId: string): Promise<ApiKey> {
    return await this.apikeyRepository.findOneBy({ userId });
  }
  async findByApiKey(apiKey: string): Promise<ApiKey> {
    return await this.apikeyRepository.findOneBy({ key: apiKey });
  }
}
