import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyModule } from 'src/company/company.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { LoanController } from './loan.controller';

@Module({
  providers: [LoanService],
  exports: [LoanService],
  imports: [PrismaModule, CompanyModule, EmployeeModule],
  controllers: [LoanController],
})
export class LoanModule {}
