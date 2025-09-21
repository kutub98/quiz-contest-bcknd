import { Router } from 'express';
import {
  createParticipation,
  getParticipations,
  getParticipationById,
  checkParticipation,
  updateParticipation,
  deleteParticipation,
  getParticipationsByQuiz,
} from './participation.controller';

const ParticipationRouter = Router();

ParticipationRouter.post('/', createParticipation);
ParticipationRouter.get('/', getParticipations);
ParticipationRouter.get('/:id', getParticipationById);
ParticipationRouter.patch('/:id', updateParticipation);
ParticipationRouter.delete('/:id', deleteParticipation);
ParticipationRouter.get('/quiz/:quizId', getParticipationsByQuiz);
ParticipationRouter.post('/check', checkParticipation);

export { ParticipationRouter };
