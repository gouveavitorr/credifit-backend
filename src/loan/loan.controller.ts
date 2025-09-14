import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/CreateLoanDto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('employee/:employeeId')
  async findByEmployeeId(@Param('employeeId') employeeId: string) {
    const loan = await this.loanService.findByEmployeeId(employeeId);

    if (!loan) {
      throw new NotFoundException('Loan with given id was not found');
    }

    return loan;
  }

  @Get('company/:companyId')
  async findByCompanyId(@Param('companyId') companyId: string) {
    const company = await this.loanService.findByCompany(companyId);

    if (!company) {
      throw new NotFoundException('Loans from this company were not found');
    }
  }

  @Post()
  async createLoan(@Body() createLoanDto: CreateLoanDto) {
    const loan = await this.loanService.createLoan(createLoanDto);
    return loan;
  }
}
