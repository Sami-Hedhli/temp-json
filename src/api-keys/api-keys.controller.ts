import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dtos';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeyService: ApiKeysService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createApiKey(@Body() createApiKeyDto: CreateApiKeyDto, @Req() req) {
    return this.apiKeyService.createApiKey({
      ...createApiKeyDto,
      userId: req.user.userId,
    });
  }
}
