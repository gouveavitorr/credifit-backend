import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/UserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: User['id']) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
