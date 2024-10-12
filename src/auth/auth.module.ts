import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfigModule } from 'src/config/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtConfigModule,ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
