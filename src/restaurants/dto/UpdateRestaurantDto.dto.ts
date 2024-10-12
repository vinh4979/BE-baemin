import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';


export class UpdateRestaurantDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  opening_hours?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  is_partner?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value === '' ? null : Number(value))
  rating?: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
