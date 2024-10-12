import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '../configENV/config.module';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}