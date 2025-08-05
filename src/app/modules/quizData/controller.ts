import { Request, Response } from 'express';
import { quizSchema } from './validators';
import { QuizService } from './service';


 const createQuiz = async (req: Request, res: Response) => {
  const parsed = quizSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const quiz = await QuizService.createQuiz(parsed.data);
  res.status(201).json({ success: true, data: quiz });
};

 const updateQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = quizSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const updated = await QuizService.updateQuizById(id, parsed.data);
  if (!updated) return res.status(404).json({ error: 'Quiz not found' });

  res.json({ success: true, data: updated });
};

 const getQuizById = async (req: Request, res: Response) => {
  const quiz = await QuizService.getQuizById(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  res.json({ success: true, data: quiz });
};

 const getAllQuizzes = async (_req: Request, res: Response) => {
  const quizzes = await QuizService.getAllQuizzes();
  res.json({ success: true, data: quizzes });
};

export const QuizController = {
  getAllQuizzes,
  createQuiz,
  updateQuizById,
  getQuizById,
};
