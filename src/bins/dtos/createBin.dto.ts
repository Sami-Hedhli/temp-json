import {
  IsAlphanumeric,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBinDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsObject() content: JSON;
  @IsNotEmpty() @IsBoolean() isPublic: boolean;
  @IsNotEmpty() @IsISO8601() expirationDate: Date;
  @IsOptional() userId: string;
}
