import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bin } from 'src/bins/bin.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bin])],
  providers: [TasksService],
})
export class TasksModule {}
