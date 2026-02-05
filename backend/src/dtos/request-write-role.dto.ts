import z from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const writeRoleSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters').max(50),
});
export default class RequestWriteRoleDto {
  public name: string;

  constructor(data: unknown) {
    const validation = writeRoleSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.name = validation.data.name;
  }
}
