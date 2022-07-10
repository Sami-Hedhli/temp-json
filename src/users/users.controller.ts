import {
  Controller,
  Post,
  UseGuards,
  Request,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login')
  async register(@Request() req) {
    return this.authService.register(req.user);
  }
}
