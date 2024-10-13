import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'ID của người dùng', example: 1 })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'ID của món ăn', example: 1 })
  @IsInt()
  @IsPositive()
  menuItemId: number;

  @ApiProperty({ description: 'Số lượng món ăn', example: 1, default: 1 })
  @IsInt()
  @IsPositive()
  quantity: number = 1;
}
