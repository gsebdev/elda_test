import z from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const createEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.email('Invalid email format'),
  roleId: z.number().int().positive('Role ID must be a positive number'),
});

export default class RequestCreateEmployeeDto {
  public firstName: string;
  public lastName: string;
  public email: string;
  public roleId: number;

  constructor(data: unknown) {
    const validation = createEmployeeSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.firstName = validation.data.firstName;
    this.lastName = validation.data.lastName;
    this.email = validation.data.email;
    this.roleId = validation.data.roleId;
  }
}
