import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) : Promise<{message : string , content : Object}> {
    const { username, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: "User registered successfully",
      content: user
    };
  }

  async login(loginDto: LoginDto): Promise<{ message: string; accessToken: string } | {message : string}> {
    const { email, password } = loginDto;
    const user = await this.prisma.users.findUnique({ where: { email } });

   
  if (!user) {
    return { message: 'Email not found' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { message: 'Incorrect password' };
  }


    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken,
    };
  }
 
}
