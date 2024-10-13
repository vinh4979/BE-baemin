import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async getAddressesByUserId(userId: number) {
    return this.prisma.addresses.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        is_default: 'desc',
      },
    });
  }
}
