import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Restaurant {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false, nullable: true })
  phone_number: string | null;

  @ApiProperty({ required: false, nullable: true })
  opening_hours: string | null;

  @ApiProperty({ required: false, nullable: true })
  is_partner: boolean | null;

  @ApiProperty({ required: false, nullable: true })
  image_url: string | null;

  @ApiProperty({ required: false, nullable: true })
  rating: Prisma.Decimal | null;

  @ApiProperty({ required: false, nullable: true })
  created_at: Date | null;

  @ApiProperty({ required: false, nullable: true })
  updated_at: Date | null;
}
