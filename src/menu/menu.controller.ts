import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MenuItem } from './entities/menu-item.entity';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('random')
  @ApiOperation({ summary: 'Lấy danh sách món ăn ngẫu nhiên' })
  @ApiQuery({ name: 'count', required: false, type: Number, description: 'Số lượng món ăn cần lấy' })
  @ApiResponse({ status: 200, description: 'Danh sách món ăn ngẫu nhiên', type: [MenuItem] })
  async getRandomMenuItems(@Query('count') count: string): Promise<MenuItem[]> {
    const itemCount = count ? parseInt(count, 10) : 10;
    return this.menuService.getRandomMenuItems(itemCount);
  }
 
}
