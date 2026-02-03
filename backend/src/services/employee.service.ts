import { ConflictError, InternalError, NotFoundError } from '../errors/internal-errors.js';
import Employee from '../models/employee.model.js';
import type { EmployeeWithRoleType } from './types/employee.types.js';

export class EmployeeService {
  async getAllEmployees(): Promise<EmployeeWithRoleType[]> {
    const employees = await Employee.findAll({
      include: [
        {
          association: 'roleDetails',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
      order: [['updatedAt', 'DESC']],
    });

    return employees.map((employee) => employee.get({ plain: true }));
  }

  async getEmployeeByIdOrThrow(id: number): Promise<EmployeeWithRoleType> {
    const employee = await Employee.findByPk(id, {
      include: [
        {
          association: 'roleDetails',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
    });

    if (!employee) {
      throw new NotFoundError('Employee');
    }

    return employee.get({ plain: true });
  }

  async createEmployeeOrThrow(data: {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  }): Promise<EmployeeWithRoleType> {
    const existingEmployee = await Employee.findOne({ where: { email: data.email } });

    if (existingEmployee) {
      throw new ConflictError('Employee with this email already exists');
    }

    const employee = await Employee.create(data);

    if (!employee) {
      throw new InternalError('Failed to create employee');
    }

    const newId = employee.get('id') as number;

    const createdEmployee = await Employee.findByPk(newId, {
      include: [
        {
          association: 'roleDetails',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
    });

    return createdEmployee!.get({ plain: true });
  }

  async updateEmployeeOrThrow(
    id: number,
    data: Partial<{
      firstName: string | undefined;
      lastName: string | undefined;
      email: string | undefined;
      roleId: number | undefined;
    }>,
  ): Promise<EmployeeWithRoleType> {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      throw new NotFoundError('Employee');
    }

    await employee.update(data);

    const updatedEmployee = await Employee.findByPk(id, {
      include: [
        {
          association: 'roleDetails',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
    });

    return updatedEmployee!.get({ plain: true });
  }

  async deleteEmployeeOrThrow(id: number): Promise<EmployeeWithRoleType> {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      throw new NotFoundError('Employee');
    }

    await employee.destroy();

    return employee.get({ plain: true });
  }
}
