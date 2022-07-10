import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MONGOATLAS_URL, MONGOATLAS_DATABASE } from './environments';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BinsModule } from './bins/bins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: MONGOATLAS_URL,
      database: MONGOATLAS_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    BinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
