import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ description: 'ID của mục trong giỏ hàng', example: 1 })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ description: 'Số lượng mới của món ăn', example: 2 })
  @IsInt()
  @IsPositive()
  quantity: number;
}
