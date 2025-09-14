import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee, User } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async findById(id: Employee['id']) {
    return await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: User['id']) {
    return await this.prisma.employee.findUnique({
      where: {
        UserId: userId,
      },
    });
  }
}
