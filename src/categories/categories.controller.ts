import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../ultils/multer-config';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createCategory(
    @Body('name') name: string,
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.categoriesService.createCategory(name, description, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.categoriesService.updateCategory(Number(id), name, description, file);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(Number(id));
  }

  @Get('restaurant/:id')
  async getCategoriesByRestaurantId(@Param('id') id: string) {
    return this.categoriesService.getCategoriesByRestaurantId(Number(id));
  }
}
