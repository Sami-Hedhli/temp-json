import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { compareInput } from 'src/util';
import { LoginDto } from 'src/users/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && compareInput(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const duplicateFound = await this.usersService.findOne(user.email);
    if (duplicateFound) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Email already exists',
      };
    }
    return await this.usersService.save(new User(user));
  }
}
