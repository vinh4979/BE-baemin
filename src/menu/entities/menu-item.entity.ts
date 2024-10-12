import { Category } from '../../categories/entities/category.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Prisma } from '@prisma/client';

export class MenuItem {
  id: number;
  restaurant_id: number | null;
  name: string;
  description: string | null;
  price: Prisma.Decimal;
  image_url: string | null;
  is_available: boolean | null;
  category_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  restaurant?: Restaurant;
  category?: Category;
}