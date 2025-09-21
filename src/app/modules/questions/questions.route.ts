import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  getQuestions,
  getQuestionsByQuizId,
  uploadQuestionImages,
  submitAnswer,
  getQuestionsByType,
  updateQuestionWithImages,
  bulkCreateQuestions,
  bulkDeleteQuestions,
} from './questions.controller';
import { questionImageUpload } from '../../config/questionUpload';

const QuestionRouter = Router();

// Basic CRUD operations
QuestionRouter.post('/', createQuestion);
QuestionRouter.post('/bulk', bulkCreateQuestions);
QuestionRouter.delete('/bulk', bulkDeleteQuestions);
QuestionRouter.get('/', getQuestions);
QuestionRouter.get('/:id', getQuestionById);
QuestionRouter.get('/quiz/:quizId', getQuestionsByQuizId);

// Question type specific routes
QuestionRouter.get('/type/:type', getQuestionsByType);

// Image upload routes
QuestionRouter.post(
  '/upload-images',
  questionImageUpload.array('images', 5),
  uploadQuestionImages,
);
QuestionRouter.put('/:questionId/images', updateQuestionWithImages);

// Answer submission routes
QuestionRouter.post(
  '/:questionId/submit-answer',
  questionImageUpload.array('images', 5),
  submitAnswer,
);

export { QuestionRouter };
