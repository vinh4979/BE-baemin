import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  // ... các phương thức khác ...

  async findByRestaurantId(restaurantId: number) {
    return this.prisma.reviews.findMany({
      where: {
        restaurant_id: restaurantId,
      },
      include: {
        users: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
