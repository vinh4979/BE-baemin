import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { PrismaService } from 'prisma/prisma.service';
import { CloudinaryService } from '../config/cloundinary/cloudinary.service';
import { UpdateRestaurantDto } from './dto/UpdateRestaurantDto.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async getRandomRestaurants(count: number = 10): Promise<Restaurant[]> {
    const totalRestaurants = await this.prisma.restaurants.count();
    const skip = Math.max(0, Math.floor(Math.random() * (totalRestaurants - count)));

    const restaurants = await this.prisma.restaurants.findMany({
      take: count,
      skip: skip,
    });

    return restaurants.map(restaurant => ({
      ...restaurant,
      rating: restaurant.rating,
    }));
  }

  async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto, imageFile?: Express.Multer.File): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurants.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    const updateData: Partial<Restaurant> = {};

    // Xử lý các trường dữ liệu
    Object.keys(updateRestaurantDto).forEach(key => {
      if (updateRestaurantDto[key] !== undefined && updateRestaurantDto[key] !== null && updateRestaurantDto[key] !== '') {
        if (key === 'is_partner') {
          updateData[key] = updateRestaurantDto[key] === true ;
        } else if (key === 'rating') {
          updateData[key] = new Prisma.Decimal(updateRestaurantDto[key]);
        } else {
          updateData[key] = updateRestaurantDto[key];
        }
      }
    });

    if (imageFile) {
      if (restaurant.image_url) {
        const publicId = this.cloudinary.extractPublicIdFromUrl(restaurant.image_url);
        await this.cloudinary.deleteImage(publicId);
      }
      const uploadResult = await this.cloudinary.uploadImage(imageFile, 'restaurants');
      updateData.image_url = uploadResult.secure_url;
    }

    return this.prisma.restaurants.update({
      where: { id },
      data: updateData,
    });
  }
}
