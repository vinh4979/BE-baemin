import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/configENV/config.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CloudinaryModule } from './config/cloundinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuModule } from './menu/menu.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule, 
    PrismaModule, 
    CloudinaryModule, 
    AuthModule, CategoriesModule, MenuModule, RestaurantsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
