import z from 'zod';
import { ValidationError } from '../errors/internal-errors.js';

const preprocessDate = (value: unknown) => {
  if (typeof value === 'string' || value instanceof Date) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed;
  }
  return value;
};

const updateSlotSchema = z
  .object({
    startDateTime: z.preprocess(preprocessDate, z.date()).optional(),
    endDateTime: z.preprocess(preprocessDate, z.date()).optional(),
    description: z.string().max(255).optional().nullable(),
    employeeId: z.number().int().positive().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.startDateTime && data.endDateTime && data.endDateTime <= data.startDateTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDateTime'],
        message: 'endDateTime must be after startDateTime',
      });
    }
  });

export default class RequestUpdateSlotDto {
  public startDateTime?: Date | undefined;
  public endDateTime?: Date | undefined;
  public description?: string | null | undefined;
  public employeeId?: number | null | undefined;

  constructor(data: unknown) {
    const validation = updateSlotSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.startDateTime = validation.data.startDateTime;
    this.endDateTime = validation.data.endDateTime;
    this.description = validation.data.description;
    this.employeeId = validation.data.employeeId;
  }
}
