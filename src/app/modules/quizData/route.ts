import express from 'express';
import { QuizController } from './controller';

const router = express.Router();

router.post('/', QuizController.createQuiz);
router.put('/:id', QuizController.getQuizById);
router.get('/:id', QuizController.updateQuizById);
router.get('/', QuizController.getAllQuizzes);

export default router;
