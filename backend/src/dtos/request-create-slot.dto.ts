import z from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const preprocessDate = (value: unknown) => {
  if (typeof value === 'string' || value instanceof Date) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed;
  }
  return value;
};

const createSlotSchema = z
  .object({
    startDateTime: z.preprocess(preprocessDate, z.date()),
    endDateTime: z.preprocess(preprocessDate, z.date()),
    description: z.string().max(255).optional().nullable(),
    employeeId: z.number().int().positive().optional().nullable(),
  })
  .refine((data) => data.endDateTime > data.startDateTime, {
    path: ['endDateTime'],
    message: 'endDateTime must be after startDateTime',
  });

export default class RequestCreateSlotDto {
  public startDateTime: Date;
  public endDateTime: Date;
  public description: string | null | undefined;
  public employeeId: number | null | undefined;

  constructor(data: unknown) {
    const validation = createSlotSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.startDateTime = validation.data.startDateTime;
    this.endDateTime = validation.data.endDateTime;
    this.description = validation.data.description;
    this.employeeId = validation.data.employeeId;
  }
}
