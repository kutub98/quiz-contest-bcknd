import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addParticipant,
  getEventWithParticipants,
} from '../modules/events/event.controller';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  getQuizzesByEventId,
  updateQuiz,
  deleteQuiz,
} from '../modules/quiz/quiz.controller';
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByQuizId,
  updateQuestion,
  deleteQuestion,
  bulkCreateQuestions,
  bulkDeleteQuestions,
} from '../modules/questions/questions.controller';

const router = Router();

// Event routes
router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.patch('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.post('/events/add-participant', addParticipant);
router.get('/events/:id/participants', getEventWithParticipants);

// Quiz routes
router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.get('/quizzes/event/:eventId', getQuizzesByEventId);
router.patch('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// Question routes
router.post('/questions', createQuestion);
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.get('/questions/quiz/:quizId', getQuestionsByQuizId);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post('/questions/bulk', bulkCreateQuestions);
router.delete('/questions/bulk', bulkDeleteQuestions);

export default router;

