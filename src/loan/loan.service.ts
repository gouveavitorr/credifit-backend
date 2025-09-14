import axios from 'axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Employee, Loan } from '@prisma/client';
import { generateDueDate } from 'src/utils/generateDueDate';
import { minimumScoreChecker } from 'src/utils/minimumScoreChecker';
import { EmployeeService } from 'src/employee/employee.service';
import { CompanyService } from 'src/company/company.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/CreateLoanDto';

@Injectable()
export class LoanService {
  constructor(
    private prisma: PrismaService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
  ) {}

  async findByEmployeeId(employeeId: Loan['employeeId']) {
    const loans = await this.prisma.loan.findMany({
      where: {
        employeeId,
      },
    });
    return loans;
  }

  async findByCompany(companyId: Employee['companyId']) {
    const loans = await this.prisma.loan.findMany({
      where: {
        employee: {
          companyId,
        },
      },
      include: {
        employee: true,
      },
    });
    return loans;
  }

  async createLoan(createLoanDto: CreateLoanDto) {
    const { amount, parcelAmount, employeeId } = createLoanDto;

    if (parcelAmount < 1 || parcelAmount > 4) {
      throw new BadRequestException('Parcel amount is invalid');
    }

    if (amount < 0)
      throw new BadRequestException('Amount cannot be less than zero');

    const dueDate = generateDueDate(new Date());

    const employee = await this.employeeService.findById(employeeId);

    if (!employee) throw new NotFoundException('Employee not found');

    if (employee.companyId) {
      const company = await this.companyService.findById(employee.companyId);

      if (!company || !employee.companyId)
        throw new NotFoundException(
          'User is not associated with a valid company',
        );
    }

    const isScoreValid: boolean = await axios
      .post<{ score: number }>(
        'https://35ec58f0-85f2-4329-9ab4-8650c5e89b99.mock.pstmn.io/score',
      )
      .then((response) => {
        return minimumScoreChecker(response.data.score, employee.salary);
      })
      .catch(() => {
        throw new ServiceUnavailableException('Failed to fetch score');
      });

    if (!isScoreValid)
      throw new BadRequestException('Score is invalid for this operation');

    const activeLoans = await this.prisma.loan.findMany({
      where: { employeeId },
    });

    const totalApproved = activeLoans.reduce((acc, loan) => {
      if (loan.approved) {
        return acc + loan.amount;
      }
      return acc;
    }, 0);

    const loanLimit = employee?.salary * 0.35;

    if (totalApproved + amount > loanLimit) {
      throw new BadRequestException('Loan requested surpasses loan limit');
    }

    const isApproved: boolean = await axios
      .post<{ status: 'aprovado' | 'reprovado' }>(
        'https://35ec58f0-85f2-4329-9ab4-8650c5e89b99.mock.pstmn.io/delivery',
      )
      .then((response) => {
        return response.data.status === 'aprovado' ? true : false;
      })
      .catch(() => {
        throw new ServiceUnavailableException('Failed to fetch service');
      });

    if (!isApproved)
      throw new BadRequestException(
        'Loan request not approved by the external service',
      );

    const loan = await this.prisma.loan.create({
      data: {
        amount,
        approved: true,
        dueDate,
        parcelAmount,
        employeeId,
      },
    });
    return loan;
  }
}
