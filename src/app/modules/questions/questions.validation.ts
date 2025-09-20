import { z } from 'zod';

// Schema for question file uploads
const questionFileSchema = z.object({
  filename: z.string(),
  originalName: z.string(),
  mimetype: z.string(),
  size: z.number(),
  path: z.string(),
  uploadedAt: z.date().optional(),
});

// Base question schema
const baseQuestionSchema = z.object({
  quizId: z.string().min(1, 'Quiz ID is required'),
  text: z.string().min(1, 'Question text is required'),
  marks: z.number().min(1, 'Marks must be at least 1'),
  explanation: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
});

// MCQ question schema
const mcqQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal('MCQ'),
  options: z
    .array(z.string().min(1, 'Option cannot be empty'))
    .min(2, 'At least 2 options required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

// Short question schema
const shortQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal('Short'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  uploadedImages: z.array(questionFileSchema).optional(),
});

// Written question schema
const writtenQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal('Written'),
  wordLimit: z.number().min(50, 'Word limit must be at least 50').optional(),
  timeLimit: z
    .number()
    .min(1, 'Time limit must be at least 1 minute')
    .optional(),
  uploadedImages: z.array(questionFileSchema).optional(),
});

// Union schema for all question types
export const createQuestionSchema = z.object({
  body: z.union([
    mcqQuestionSchema,
    shortQuestionSchema,
    writtenQuestionSchema,
  ]),
});

// Schema for submitting answers
export const submitAnswerSchema = z.object({
  body: z.object({
    answer: z.string().min(1, 'Answer is required'),
    participantId: z.string().min(1, 'Participant ID is required'),
  }),
  params: z.object({
    questionId: z.string().min(1, 'Question ID is required'),
  }),
});

// Schema for updating question with images
export const updateQuestionImagesSchema = z.object({
  body: z.object({
    uploadedImages: z.array(questionFileSchema),
  }),
  params: z.object({
    questionId: z.string().min(1, 'Question ID is required'),
  }),
});

// Schema for getting questions by type
export const getQuestionsByTypeSchema = z.object({
  params: z.object({
    type: z.enum(['MCQ', 'Short', 'Written']),
  }),
  query: z.object({
    quizId: z.string().optional(),
    populate: z.string().optional(),
  }),
});
