import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.array(
    z.object({
      img: z.string(),
      servicesName: z.string(),
      servicesDetails: z.string(),
      serviceInfo: z.array(z.string()),
      status: z.enum(['approved', 'delete', 'pending']).optional(),
    }),
  ),
});

export const serviceValidation = {
  createServiceValidationSchema,
};
