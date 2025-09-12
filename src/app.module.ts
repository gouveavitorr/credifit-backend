import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoanModule } from './loan/loan.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, PrismaModule, LoanModule, EmployeeModule, CompanyModule],
})
export class AppModule {}
