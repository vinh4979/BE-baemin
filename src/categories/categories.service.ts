import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CloudinaryService } from '../config/cloundinary/cloudinary.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.categories.findMany();
  }

  async getCategoryById(id: number) {
    return this.prisma.categories.findUnique({
      where: { id },
    });
  }

  async createCategory(name: string, description: string, imageFile: Express.Multer.File) {
    const uploadResult = await this.cloudinary.uploadImage(imageFile, 'categories');
    
    return this.prisma.categories.create({
      data: {
        name,
        description,
        image_url: uploadResult.secure_url,
      },
    });
  }

  async updateCategory(id: number, name: string, description: string, imageFile?: Express.Multer.File) {
    const updateData: any = { name, description };

    if (imageFile) {
      const uploadResult = await this.cloudinary.uploadImage(imageFile, 'categories');
      updateData.image_url = uploadResult.secure_url;
    }

    return this.prisma.categories.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.categories.delete({
      where: { id },
    });
  }
}
