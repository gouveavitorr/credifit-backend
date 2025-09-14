import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './employee.controller';

@Module({
  providers: [EmployeeService],
  exports: [EmployeeService],
  imports: [PrismaModule],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
