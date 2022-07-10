import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BinsService } from './bins.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'createUserDto';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
