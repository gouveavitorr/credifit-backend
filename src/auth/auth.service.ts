import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  singup(singUpDto: SignUpDto) {
    return this.userService.createUser(singUpDto);
  }

  login(loginDto: LoginDto) {
    const user = this.userService.findByEmail(loginDto.email);
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Logged in successfully', user };
  }
}
