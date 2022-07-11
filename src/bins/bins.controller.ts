import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BinsService } from './bins.service';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  create() {
    return 'createUserDto';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
