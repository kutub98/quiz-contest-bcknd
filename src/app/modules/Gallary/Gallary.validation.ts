import { z } from 'zod';

const createGallaryValidationSchema = z.object({
  body: z.array(
    z.object({
      img: z.string(),
      status: z.enum(['approved', 'delete', 'pending']).optional(),
    }),
  ),
});

export const GallaryValidation = {
  createGallaryValidationSchema,
};
