import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/environments';
import { JwtStrategy } from './jwt.strategy';
import { forwardRef } from '@nestjs/common';
import { ApiKeysModule } from 'src/api-keys/api-keys.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ApiKeysModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '9999999s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
