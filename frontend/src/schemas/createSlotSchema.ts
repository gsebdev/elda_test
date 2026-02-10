import z from 'zod';

const createSlotSchema = z.object({
  title: z
    .string()
    .min(1, 'Le nom du créneau ne peut pas être vide')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .refine((val) => !val.includes('\n'), {
      message: 'Les sauts de ligne ne sont pas autorisés',
    })
    .transform((val) => val.trim()),
  startDateTime: z.iso.datetime(),
  endDateTime: z.iso.datetime(),
});

export type SlotFormData = z.infer<typeof createSlotSchema>;

export default createSlotSchema;
