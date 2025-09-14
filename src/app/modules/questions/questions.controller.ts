import { Request, Response } from 'express';
import { Question } from './questions.model';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().populate('quizId');
    res.json({ success: true, data: questions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id).populate('quizId');
    if (!question)
      return res
        .status(404)
        .json({ success: false, message: 'Question not found' });
    res.json({ success: true, data: question });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
