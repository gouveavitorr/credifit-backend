import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';

@Module({
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
