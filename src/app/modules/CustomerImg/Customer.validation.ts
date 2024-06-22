import { z } from 'zod';

const createCustomerValidationSchema = z.object({
  body: z.array(
    z.object({
      img: z.string(),
      status: z.enum(['approved', 'delete', 'pending']).optional(),
    }),
  ),
});

export const CustomerValidation = {
  createCustomerValidationSchema,
};
