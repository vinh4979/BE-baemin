import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService)  {}

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiBody({type: RegisterDto})
  async register(@Body() registerDto: RegisterDto) : Promise<{message: string , content: Object}> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<{ message: string; accessToken: string } | {message: string}> {
    return this.authService.login(loginDto);
  }
  
}
