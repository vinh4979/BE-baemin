import { Controller, Get, Query, Put, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../ultils/multer-config';
import { UpdateRestaurantDto } from './dto/UpdateRestaurantDto.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('random')
  @ApiOperation({ summary: 'Lấy danh sách nhà hàng ngẫu nhiên' })
  @ApiQuery({ name: 'count', required: false, type: Number, description: 'Số lượng nhà hàng cần lấy' })
  @ApiResponse({ status: 200, description: 'Danh sách nhà hàng ngẫu nhiên', type: [Restaurant] })
  async getRandomRestaurants(@Query('count') count: string): Promise<Restaurant[]> {
    const restaurantCount = count ? parseInt(count, 10) : 10;
    return this.restaurantsService.getRandomRestaurants(restaurantCount);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhà hàng' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateRestaurantDto })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Restaurant> {
    return this.restaurantsService.updateRestaurant(+id, updateRestaurantDto, file);
  }
}
