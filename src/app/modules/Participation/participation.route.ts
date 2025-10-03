import { Router } from 'express';
import {
  createParticipation,
  getParticipations,
  getParticipationById,
  checkParticipation,
  updateParticipation,
  deleteParticipation,
  getParticipationsByQuiz,
  submitParticipationAnswer,
} from './participation.controller';
import { questionImageUpload } from '../../config/questionUpload';

const ParticipationRouter = Router();

ParticipationRouter.post('/', createParticipation);
ParticipationRouter.get('/', getParticipations);
ParticipationRouter.get('/:id', getParticipationById);
ParticipationRouter.patch('/:id', updateParticipation);
ParticipationRouter.delete('/:id', deleteParticipation);
ParticipationRouter.get('/quiz/:quizId', getParticipationsByQuiz);
ParticipationRouter.post('/check', checkParticipation);
// Submit/update a single answer of a participation with optional images
ParticipationRouter.post(
  '/:id/submit-answer',
  questionImageUpload.array('images', 5),
  submitParticipationAnswer,
);

export { ParticipationRouter };
