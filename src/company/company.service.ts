import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findById(id: Company['id']) {
    return await this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }
}
