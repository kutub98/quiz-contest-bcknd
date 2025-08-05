import { z } from 'zod';

export const quizSchema = z.object({
  quizInfo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  competitionDetails: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    icon: z.string().url(),
  }),
  rules: z.object({
    title: z.string().min(1),
    items: z.array(z.string().min(1)),
  }),
});

export type QuizSchemaType = z.infer<typeof quizSchema>;
