import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(private cartService: CartsService) {}

  @Get(':userId')
  async getUserCart(@Param('userId') userId: string) {
    const cartItems = await this.cartService.getCartItemsByUserId(parseInt(userId));
    return cartItems;
  }

  @Post('add')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({ status: 201, description: 'Sản phẩm đã được thêm vào giỏ hàng' })
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm trong giỏ hàng' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Sản phẩm đã được cập nhật trong giỏ hàng' })
  async updateCartItem(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete('remove/:id')
  async removeCartItem(@Param('id') id: string) {
    return this.cartService.removeCartItem(parseInt(id));
  }

  @Delete('remove-multiple')
  async removeMultipleItems(@Body() body: { ids: number[] }) {
    return this.cartService.removeMultipleItems(body.ids);
  }
}
