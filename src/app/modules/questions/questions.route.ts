import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  getQuestions,
} from './questions.controller';

const QuestionRouter = Router();

QuestionRouter.post('/', createQuestion);
QuestionRouter.get('/', getQuestions);
QuestionRouter.get('/:id', getQuestionById);

export { QuestionRouter };
