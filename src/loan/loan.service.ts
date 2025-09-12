import { Injectable } from '@nestjs/common';
import { Company, Employee, Loan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createLoanDto } from './dto/createLoanDto';
import axios from 'axios';
import { generateDueDate } from 'src/utils/generateDueDate';
import { minimumScoreChecker } from 'src/utils/minimumScoreChecker';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

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

  async createLoan(createLoanDto: createLoanDto) {
    const { amount, approved, parcelAmount, employeeId } = createLoanDto;

    if (parcelAmount < 1 || parcelAmount > 4) {
      throw new Error('Parcel amount out of bounds');
    }

    const dueDate = generateDueDate(new Date());

    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) throw new Error('Employee not found');

    if (employee.companyId) {
      const company = await this.prisma.company.findUnique({
        where: { id: employee.companyId },
      });

      if (!company)
        throw new Error('User is not associated with a valid company');
    } else if (!employee.companyId) {
      throw new Error('User is not associated with a valid company');
    }

    const isScoreValid: boolean = await axios
      .post<{ score: number }>(
        'https://35ec58f0-85f2-4329-9ab4-8650c5e89b99.mock.pstmn.io/score',
      )
      .then((response) => {
        return minimumScoreChecker(response.data.score, employee.salary);
      })
      .catch(() => {
        throw new Error('Failed to fetch score');
      });

    if (!isScoreValid) throw new Error('Score is invalid for this operation');

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
      throw new Error('Loan requested surpasses loan limit');
    }

    const isApproved: boolean = axios
      .post<{ status: 'aprovado' | 'reprovado' }>(
        'https://35ec58f0-85f2-4329-9ab4-8650c5e89b99.mock.pstmn.io/delivery',
      )
      .then((response) => {
        return response.data.status === 'aprovado' ? true : false;
      })
      .catch((error) => {
        console.log(error);
      });

    const loan = await this.prisma.loan.create({
      data: {
        amount,
        approved,
        dueDate,
        parcelAmount,
        employeeId,
      },
    });
    return loan;
  }
}
