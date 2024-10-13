import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCartItemsByUserId(userId: number) {
    try {
      const cartItems = await this.prisma.cart_items.findMany({
        where: {
          user_id: userId,
        },
        include: {
          menu_items: {
            include: {
              restaurants: true,
            },
          },
        },
      });

      return cartItems;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách giỏ hàng:', error);
      throw error;
    }
  }

  async addToCart(addToCartDto: AddToCartDto) {
    console.log('Received addToCartDto:', addToCartDto);
    const { userId, menuItemId, quantity } = addToCartDto;

    try {
      const existingCartItem = await this.prisma.cart_items.findFirst({
        where: {
          user_id: userId,
          menu_item_id: menuItemId,
        },
      });

      console.log('Existing cart item:', existingCartItem);

      let result;
      if (existingCartItem) {
        result = await this.prisma.cart_items.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
      } else {
        result = await this.prisma.cart_items.create({
          data: {
            user_id: userId,
            menu_item_id: menuItemId,
            quantity,
          },
        });
      }

      console.log('Operation result:', result);
      return result;
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }

  async updateCartItem(updateCartDto: UpdateCartDto) {
    const { id, quantity } = updateCartDto;
    return this.prisma.cart_items.update({
      where: { id },
      data: { quantity },
    });
  }

  async removeCartItem(id: number) {
    return this.prisma.cart_items.delete({
      where: { id },
    });
  }

  async removeMultipleItems(ids: number[]) {
    await this.prisma.cart_items.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    return { message: 'Items removed successfully' };
  }
}
