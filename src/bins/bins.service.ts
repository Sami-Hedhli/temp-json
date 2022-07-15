import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bin } from './bin.entity';
import { ObjectID } from 'mongodb';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BinsService {
  constructor(
    @InjectRepository(Bin)
    private binsRepository: Repository<Bin>,
    private authService: AuthService,
  ) {}

  private async reduceReadingCount(bin: Bin): Promise<Bin> {
    bin.readCount--;
    await this.binsRepository.save(bin);
    return bin;
  }

  async findOne(
    _id: string,
    contentOnly = false,
    apiKey = '',
  ): Promise<Bin | any> {
    const bin = await this.binsRepository.findOneBy({ _id: new ObjectID(_id) });
    if (!bin) throw new HttpException('Bin not found', HttpStatus.NOT_FOUND);

    if (bin.readCount === 0) {
      throw new HttpException('Max read count reached', HttpStatus.OK);
    }

    if (bin.isExpired) {
      throw new HttpException('Bin has been expired', HttpStatus.OK);
    }

    if (bin.isDeleted) {
      throw new HttpException('Bin has been deleted', HttpStatus.NOT_FOUND);
    }
    if (
      bin.isPrivate &&
      !(await this.authService.canAccess(apiKey, bin.userId))
    ) {
      throw new HttpException(
        'API key is incorrect or invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newBin = await this.reduceReadingCount(bin);
    if (contentOnly) return bin.content;
    return newBin;
  }
  async findByBinId(_id: string): Promise<Bin> {
    return await this.binsRepository.findOneBy({ _id: new ObjectID(_id) });
  }

  async findAll(): Promise<Bin[]> {
    return this.binsRepository.find();
  }

  async remove(_id: string): Promise<void> {
    await this.binsRepository.delete(_id);
  }

  async save(bin: any): Promise<Bin> {
    return await this.binsRepository.save(new Bin(bin));
  }
}
