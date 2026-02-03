import z from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const preprocessId = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = parseInt(String(value), 10);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
};

const employeeIdSchema = z.preprocess(
  preprocessId,
  z.number().int().positive('ID must be a positive number'),
);

export class RequestEmployeeIdDto {
  public id: number;

  constructor(data: Record<string, unknown>) {
    const { id } = data;
    const validation = employeeIdSchema.safeParse(id);

    if (!validation.success) {
      throw new ValidationError(`Invalid employee ID in request: ${JSON.stringify(id)}`);
    }
    this.id = validation.data;
  }
}
