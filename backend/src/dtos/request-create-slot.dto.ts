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
    title: z.string().min(1).max(100),
    startDate: z.preprocess(preprocessDate, z.date()).optional(),
    startDateTime: z.preprocess(preprocessDate, z.date()),
    endDateTime: z.preprocess(preprocessDate, z.date()).optional(),
    slotTemplate: z.string().min(1).max(100).optional().nullable(),
    description: z.string().max(255).optional().nullable(),
    employeeIds: z.array(z.number().int().positive()).optional(),
  })
  .superRefine((data, ctx) => {
    const hasCustomDateTimes = Boolean(data.startDateTime && data.endDateTime);
    const hasStartDateAndType = Boolean(data.startDateTime && data.slotTemplate);

    if (!hasCustomDateTimes && !hasStartDateAndType) {
      ctx.addIssue({
        code: 'invalid_value',
        values: ['invalid_value'],
        path: ['startDateTime'],
        message: 'Provide startDateTime + (endDateTime or slotTemplate)',
      });
    }

    if (data.startDateTime && data.endDateTime && data.endDateTime <= data.startDateTime) {
      ctx.addIssue({
        code: 'invalid_value',
        values: ['invalid_value'],
        path: ['endDateTime'],
        message: 'endDateTime must be after startDateTime',
      });
    }
  });

export default class RequestCreateSlotDto {
  public title: string;
  public startDateTime: Date;
  public endDateTime: Date | null;
  public slotTemplate: string | null;
  public description: string | null;
  public employeeIds: number[] | null;

  constructor(data: unknown) {
    const validation = createSlotSchema.safeParse(data);

    if (!validation.success) {
      throw new ValidationError(JSON.stringify(validation.error.issues));
    }

    this.title = validation.data.title;
    this.startDateTime = validation.data.startDateTime;
    this.endDateTime = validation.data.endDateTime ?? null;
    this.slotTemplate = validation.data.slotTemplate ?? null;
    this.description = validation.data.description ?? null;
    this.employeeIds = validation.data.employeeIds ?? null;
  }
}
