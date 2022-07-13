import { Module } from '@nestjs/common';
import { BinsService } from './bins.service';
import { BinsController } from './bins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bin } from './bin.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bin]), AuthModule],
  providers: [BinsService],
  controllers: [BinsController],
})
export class BinsModule {}
