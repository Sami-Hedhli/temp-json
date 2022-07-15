import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Bin } from 'src/bins/bin.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Bin)
    private binsRepository: MongoRepository<Bin>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const currentTime = new Date().getTime();
    const { result } = await this.binsRepository.updateMany(
      {
        expirationDate: { $lt: currentTime },
        isExpired: false,
      },
      { $set: { isExpired: true } },
    );

    console.log(
      '🚀 ~ file: tasks.service.ts ~ line 36 ~ TasksService ~ handleCron ~ bins',
      result.nModified,
    );
  }
}
