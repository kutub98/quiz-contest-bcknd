import { z } from 'zod';

// Question validation schemas
const mcqQuestionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.literal('MCQ'),
    marks: z.number().min(1, 'Marks must be at least 1'),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    explanation: z.string().optional(),
    options: z
      .array(z.string().min(1, 'Option cannot be empty'))
      .min(2, 'MCQ must have at least 2 options'),
    correctAnswer: z.string().min(1, 'Correct answer is required'),
    isRequired: z.boolean().default(true),
    order: z.number().min(0),
  })
  .refine((data) => data.options.includes(data.correctAnswer), {
    message: 'Correct answer must be one of the provided options',
    path: ['correctAnswer'],
  });

const writtenQuestionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.literal('Written'),
    marks: z.number().min(1, 'Marks must be at least 1'),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    explanation: z.string().optional(),
    allowImageUpload: z.boolean().default(false),
    allowFileUpload: z.boolean().default(false),
    maxFileSize: z.number().min(1).max(50).default(5), // 1-50 MB
    allowedFileTypes: z.array(z.string()).optional(),
    isRequired: z.boolean().default(true),
    order: z.number().min(0),
  })
  .refine((data) => data.allowImageUpload || data.allowFileUpload, {
    message: 'Written questions must allow either image or file upload',
    path: ['allowImageUpload'],
  });

const shortQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.literal('Short'),
  marks: z.number().min(1, 'Marks must be at least 1'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  explanation: z.string().optional(),
  maxLength: z.number().min(10).max(1000).default(100),
  expectedKeywords: z.array(z.string()).optional(),
  isRequired: z.boolean().default(true),
  order: z.number().min(0),
});

// Union schema for all question types
const questionSchema = z.discriminatedUnion('type', [
  mcqQuestionSchema,
  writtenQuestionSchema,
  shortQuestionSchema,
]);

// Quiz validation schema
const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  description: z.string().optional(),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  passingMarks: z.number().min(0).default(0),
  instructions: z.string().optional(),
  isActive: z.boolean().default(true),
  questions: z.array(questionSchema).optional().default([]),
  order: z.number().min(0),
});

// Event validation schema
const eventSchema = z
  .object({
    title: z.string().min(1, 'Event title is required'),
    description: z.string().optional(),
    startDate: z.string().datetime('Invalid start date format'),
    endDate: z.string().datetime('Invalid end date format'),
    createdBy: z.string().optional(),
    quizzes: z.array(quizSchema).optional().default([]),
    isActive: z.boolean().default(true),
    maxParticipants: z.number().min(1).optional(),
    registrationDeadline: z
      .string()
      .datetime('Invalid registration deadline format')
      .optional(),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

// Validation schemas for specific operations
export const createEventValidation = eventSchema;
export const updateEventValidation = eventSchema.partial();

export const addQuizValidation = quizSchema.omit({ order: true });
export const updateQuizValidation = quizSchema.partial().omit({ order: true });

export const addQuestionValidation = questionSchema.omit({ order: true });
export const updateQuestionValidation = questionSchema
  .partial()
  .omit({ order: true });

// File upload validation
export const fileUploadValidation = z.object({
  files: z
    .array(z.any())
    .min(1, 'At least one file is required')
    .max(5, 'Maximum 5 files allowed'),
});

// Query parameter validation
export const getEventsQueryValidation = z.object({
  status: z.enum(['upcoming', 'ongoing', 'completed']).optional(),
  isActive: z.enum(['true', 'false']).optional(),
  populate: z.enum(['createdBy', 'quizzes']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

// Path parameter validation
export const eventIdValidation = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
});

export const quizIndexValidation = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  quizIndex: z.string().regex(/^\d+$/, 'Quiz index must be a number'),
});

export const questionIndexValidation = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  quizIndex: z.string().regex(/^\d+$/, 'Quiz index must be a number'),
  questionIndex: z.string().regex(/^\d+$/, 'Question index must be a number'),
});

export const fileIndexValidation = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  quizIndex: z.string().regex(/^\d+$/, 'Quiz index must be a number'),
  questionIndex: z.string().regex(/^\d+$/, 'Question index must be a number'),
  fileIndex: z.string().regex(/^\d+$/, 'File index must be a number'),
});
