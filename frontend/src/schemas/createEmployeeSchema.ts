import z from 'zod';

const createEmployeeSchema = z.object({
  firstName: z.string().min(2, 'Mettre au moins deux lettres').max(50),
  lastName: z.string().min(2, 'Mettre au moins deux lettres').max(50),
  email: z.email('Email non valide'),
  roleId: z
    .number('Veuillez sélectionner un métier valide')
    .int()
    .positive('Veuillez sélectionner un métier valide'),
});

export type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

export default createEmployeeSchema;
