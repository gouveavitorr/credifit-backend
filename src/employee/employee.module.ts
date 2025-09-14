import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [EmployeeService],
  exports: [EmployeeService],
  imports: [PrismaModule],
})
export class EmployeeModule {}
