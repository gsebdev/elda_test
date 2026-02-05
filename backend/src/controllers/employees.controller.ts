import type { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service.js';
import { Logger } from '../utils/logger.js';
import { RequestIdDto } from '../dtos/request-id.dto.js';
import RequestCreateEmployeeDto from '../dtos/request-create-employee.dto.js';
import RequestUpdateEmployeeDto from '../dtos/request-update-employee.dto.js';

export class EmployeeController {
  private logger = new Logger('EmployeeController');

  constructor(private employeeService: EmployeeService) {}

  async getEmployees(_: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();

    res.json({
      success: true,
      data: employees,
    });
  }

  async getEmployeeById(req: Request, res: Response) {
    const params = new RequestIdDto(req.params);

    const employee = await this.employeeService.getEmployeeByIdOrThrow(params.id);

    res.json({
      success: true,
      data: employee,
    });
  }

  async createEmployee(req: Request, res: Response) {
    const body = new RequestCreateEmployeeDto(req.body);

    const employee = await this.employeeService.createEmployeeOrThrow(body);

    this.logger.log(`Employee created with id: ${employee.id}`);

    res.status(201).json({
      success: true,
      data: employee,
      message: 'Employee created successfully',
    });
  }

  async updateEmployee(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const body = new RequestUpdateEmployeeDto(req.body);

    const employee = await this.employeeService.updateEmployeeOrThrow(id, body);

    this.logger.log(`Employee ${id} updated successfully`);

    res.json({
      success: true,
      data: employee,
      message: 'Employee updated successfully',
    });
  }

  async removeEmployee(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const employee = await this.employeeService.deleteEmployeeOrThrow(id);

    this.logger.log(`Employee ${id} deleted successfully`);

    res.json({
      success: true,
      data: employee,
      message: 'Employee deleted successfully',
    });
  }
}
