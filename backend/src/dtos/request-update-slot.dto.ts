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
    title: z.string().min(1).max(100).optional(),
    startDateTime: z.preprocess(preprocessDate, z.date()).optional(),
    endDateTime: z.preprocess(preprocessDate, z.date()).optional(),
    description: z.string().max(255).optional().nullable(),
    employeeIds: z.array(z.number().int().positive()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDateTime && data.endDateTime && data.endDateTime <= data.startDateTime) {
      ctx.addIssue({
        code: 'invalid_value',
        values: ['invalid_value'],
        path: ['endDateTime'],
        message: 'endDateTime must be after startDateTime',
      });
    }
  });

export default class RequestUpdateSlotDto {
  public title?: string | undefined;
  public startDateTime?: Date | undefined;
  public endDateTime?: Date | undefined;
  public description?: string | null | undefined;
  public employeeIds?: number[] | undefined;

  constructor(data: unknown) {
    const validation = updateSlotSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.title = validation.data.title;
    this.startDateTime = validation.data.startDateTime;
    this.endDateTime = validation.data.endDateTime;
    this.description = validation.data.description;
    this.employeeIds = validation.data.employeeIds;
  }
}
