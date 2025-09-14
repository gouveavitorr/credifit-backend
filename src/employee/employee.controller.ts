import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    const employee = await this.employeeService.findById(id);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const employee = await this.employeeService.findByUserId(userId);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }
}
