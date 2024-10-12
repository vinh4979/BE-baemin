import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getRandomMenuItems(count: number = 10): Promise<MenuItem[]> {
    const totalItems = await this.prisma.menu_items.count();
    const skip = Math.max(0, Math.floor(Math.random() * (totalItems - count)));

    return this.prisma.menu_items.findMany({
      take: count,
      skip: skip,
      include: {
        categories: true,
        restaurants: true,
      },
    });
  }
}
