import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
      { cnpj: '11111111000101', companyName: 'TechTechy' },
      { cnpj: '22222222000102', companyName: 'HealthHealthy' },
      { cnpj: '33333333000103', companyName: 'TimeTimey' },
    ],
  });

  const allCompanies = await prisma.company.findMany();

  const employeesData = [
    {
      name: 'Alice Ballice',
      cpf: '00011122233',
      email: 'alice@corp.com',
      password: 'pass1',
      salary: 1500,
      companyId: allCompanies[0].id,
    },
    {
      name: 'Bobbie Goods',
      cpf: '00011122244',
      email: 'bobbie@corp.com',
      password: 'pass2',
      salary: 2500,
      companyId: allCompanies[0].id,
    },
    {
      name: 'Charlie Brown',
      cpf: '00011122255',
      email: 'charlie@corp.com',
      password: 'pass3',
      salary: 3800,
      companyId: allCompanies[1].id,
    },
    {
      name: 'Dionysus',
      cpf: '00011122266',
      email: 'dio@corp.com',
      password: 'pass4',
      salary: 8200,
      companyId: allCompanies[1].id,
    },
    {
      name: 'Mellinöe',
      cpf: '00011122277',
      email: 'melinoe@corp.com',
      password: 'pass5',
      salary: 12000,
      companyId: allCompanies[2].id,
    },
    {
      name: 'Frankie Ocean',
      cpf: '00011122288',
      email: 'frankie@corp.com',
      password: 'pass6',
      salary: 4000,
      companyId: allCompanies[2].id,
    },
    {
      name: 'Hollow Knight',
      cpf: '00011122299',
      email: 'hollow@corp.com',
      password: 'pass7',
      salary: 5000,
      companyId: null,
    },
    {
      name: 'Silk Song',
      cpf: '00011122300',
      email: 'silkie@corp.com',
      password: 'pass8',
      salary: 2200,
      companyId: null,
    },
  ];

  const employees: { id: string; name: string }[] = [];

  for (const emp of employeesData) {
    const user = await prisma.user.create({
      data: {
        name: emp.name,
        cpf: emp.cpf,
        email: emp.email,
        password: emp.password,
      },
    });

    const employee = await prisma.employee.create({
      data: {
        salary: emp.salary,
        companyId: emp.companyId ?? null,
        UserId: user.id,
      },
    });

    employees.push({ id: employee.id, name: emp.name });
  }
  await prisma.loan.createMany({
    data: [
      {
        amount: 300,
        approved: true,
        parcelAmount: 150,
        dueDate: new Date('2025-09-02'),
        employeeId: employees[0].id,
      },
      {
        amount: 200,
        approved: true,
        parcelAmount: 200,
        dueDate: new Date('2025-09-03'),
        employeeId: employees[0].id,
      },
      {
        amount: 800,
        approved: false,
        parcelAmount: 400,
        dueDate: new Date('2025-09-04'),
        employeeId: employees[0].id,
      },
    ],
  });

  await prisma.loan.createMany({
    data: [
      {
        amount: 500,
        approved: true,
        parcelAmount: 250,
        dueDate: new Date('2025-08-04'),
        employeeId: employees[1].id,
      },
      {
        amount: 600,
        approved: true,
        parcelAmount: 200,
        dueDate: new Date('2025-08-05'),
        employeeId: employees[1].id,
      },
      {
        amount: 2000,
        approved: false,
        parcelAmount: 1000,
        dueDate: new Date('2025-08-06'),
        employeeId: employees[1].id,
      },
    ],
  });

  await prisma.loan.createMany({
    data: [
      {
        amount: 1000,
        approved: true,
        parcelAmount: 500,
        dueDate: new Date('2025-07-06'),
        employeeId: employees[2].id,
      },
      {
        amount: 1200,
        approved: true,
        parcelAmount: 400,
        dueDate: new Date('2025-07-07'),
        employeeId: employees[2].id,
      },
      {
        amount: 2500,
        approved: false,
        parcelAmount: 1250,
        dueDate: new Date('2025-07-08'),
        employeeId: employees[2].id,
      },
    ],
  });

  await prisma.loan.createMany({
    data: [
      {
        amount: 2000,
        approved: true,
        parcelAmount: 1000,
        dueDate: new Date('2025-06-08'),
        employeeId: employees[3].id,
      },
      {
        amount: 2500,
        approved: true,
        parcelAmount: 1250,
        dueDate: new Date('2025-06-09'),
        employeeId: employees[3].id,
      },
      {
        amount: 6000,
        approved: false,
        parcelAmount: 2000,
        dueDate: new Date('2025-06-10'),
        employeeId: employees[3].id,
      },
    ],
  });

  await prisma.loan.createMany({
    data: [
      {
        amount: 3000,
        approved: true,
        parcelAmount: 1000,
        dueDate: new Date('2025-05-10'),
        employeeId: employees[4].id,
      },
      {
        amount: 4000,
        approved: true,
        parcelAmount: 2000,
        dueDate: new Date('2025-05-11'),
        employeeId: employees[4].id,
      },
      {
        amount: 7000,
        approved: false,
        parcelAmount: 3500,
        dueDate: new Date('2025-05-11'),
        employeeId: employees[4].id,
      },
    ],
  });

  await prisma.loan.createMany({
    data: [
      {
        amount: 2000,
        approved: false,
        parcelAmount: 1000,
        dueDate: new Date('2025-04-12'),
        employeeId: employees[5].id,
      },
      {
        amount: 5000,
        approved: false,
        parcelAmount: 2500,
        dueDate: new Date('2025-04-13'),
        employeeId: employees[5].id,
      },
    ],
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
