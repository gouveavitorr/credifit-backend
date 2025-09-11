import { Injectable } from '@nestjs/common';
import { Company, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createLoanDto } from './dto/createLoanDto';
import axios from 'axios';
import { generateDueDate } from 'src/utils/generateDueDate';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async findByCpf(cpf: User['cpf']) {
    const loans = await this.prisma.user.findMany({
      where: {
        cpf: cpf,
      },
    });
    return loans;
  }

  async findByCnpj(cnpj: Company['cnpj']) {
    const loans = await this.prisma.company.findMany({
      where: {
        cnpj: cnpj,
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

    //check score
    axios
      .post('https://mocki.io/v1/f7b3627c-444a-4d65-b76b-d94a6c63bdcf', {
        score: 650,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //throw error if score is not enough based on the salary

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

    //mock delivery
    axios
      .post('https://mocki.io/v1/386c594b-d42f-4d14-8036-508a0cf1264c', {
        status: 'aprovado',
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //check due date

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
