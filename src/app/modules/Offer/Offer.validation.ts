import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.array(
    z.object({
      img: z.string(),
      OfferName: z.string(),
      OfferDetails: z.string(),
      OfferInfo: z.array(z.string()),
      status: z.enum(['approved', 'delete', 'pending']).optional(),
    }),
  ),
});

export const OfferValidation = {
  createServiceValidationSchema,
};
