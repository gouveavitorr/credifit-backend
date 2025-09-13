import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '@prisma/client';

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
}
