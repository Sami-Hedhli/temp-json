import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
