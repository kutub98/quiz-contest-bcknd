import { Request, Response } from 'express';
import { Quiz } from './quiz.modal';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().populate('questions').populate('eventId');
    res.json({ success: true, data: quizzes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('questions')
      .populate('eventId');
    if (!quiz)
      return res
        .status(404)
        .json({ success: false, message: 'Quiz not found' });
    res.json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
