import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() userId: string;
}
