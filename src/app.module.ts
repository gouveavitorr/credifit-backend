import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [UserModule, PrismaModule, LoanModule],
})
export class AppModule {}
