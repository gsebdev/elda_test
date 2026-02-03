import { z } from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const updateEmployeeSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  email: z.email().optional(),
  roleId: z.number().int().positive().optional(),
});

export default class RequestUpdateEmployeeDto {
  public firstName?: string | undefined;
  public lastName?: string | undefined;
  public email?: string | undefined;
  public roleId?: number | undefined;

  constructor(data: unknown) {
    const validation = updateEmployeeSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.firstName = validation.data.firstName;
    this.lastName = validation.data.lastName;
    this.email = validation.data.email;
    this.roleId = validation.data.roleId;
  }
}
