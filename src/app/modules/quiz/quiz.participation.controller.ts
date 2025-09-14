import { Request, Response } from 'express';
import { Quiz } from './quiz.modal';
import { Question } from '../questions/questions.model';
import { User } from '../User/user.model';
import { Participation } from '../Participation/participation.model';
import { AuthRequest } from '../../middleware/auth.middleware';
import mongoose from 'mongoose';


export const getQuizForParticipation = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }
    
    
    const quiz = await Quiz.findById(quizId).populate('eventId');
    if (!quiz || !quiz.isActive) {
      return res.status(404).json({ success: false, message: 'কুইজ পাওয়া যায়নি বা নিষ্ক্রিয়' });
    }
    
    
    const event = quiz.eventId as any;
    if (event.status !== 'ongoing') {
      return res.status(400).json({ success: false, message: 'ইভেন্ট চলমান নয়' });
    }
    
    
    if (!event.participants.includes(userId)) {
      return res.status(403).json({ success: false, message: 'আপনি এই ইভেন্টের জন্য রেজিস্টার্ড নন' });
    }
    
    
    const user = await User.findById(userId);
    if (user?.participatedQuizzes.includes(quizId as any)) {
      return res.status(400).json({ success: false, message: 'আপনি ইতিমধ্যে এই কুইজ নিয়েছেন' });
    }
    
    
    const questions = await Question.find({ 
      quizId 
    }).select('-correctAnswer -explanation');
    
    res.json({ 
      success: true, 
      data: {
        quiz,
        questions
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }
    
    
    const quiz = await Quiz.findById(quizId).populate('eventId');
    if (!quiz || !quiz.isActive) {
      return res.status(404).json({ success: false, message: 'কুইজ পাওয়া যায়নি বা নিষ্ক্রিয়' });
    }
    
    
    const event = quiz.eventId as any;
    if (event.status !== 'ongoing') {
      return res.status(400).json({ success: false, message: 'ইভেন্ট চলমান নয়' });
    }
    
    
    if (!event.participants.includes(userId)) {
      return res.status(403).json({ success: false, message: 'আপনি এই ইভেন্টের জন্য রেজিস্টার্ড নন' });
    }
    
    
    const user = await User.findById(userId);
    if (user?.participatedQuizzes.includes(quizId as any)) {
      return res.status(400).json({ success: false, message: 'আপনি ইতিমধ্যে এই কুইজ নিয়েছেন' });
    }
    
    
    const questions = await Question.find({ quizId });
    
    
    let totalScore = 0;
    const processedAnswers = answers.map((answer: any) => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (!question) {
        throw new Error(`ID ${answer.questionId} সহ প্রশ্ন পাওয়া যায়নি`);
      }
      
      const isCorrect = answer.selectedOption === question.correctAnswer;
      const marksObtained = isCorrect ? question.marks : 0;
      totalScore += marksObtained;
      
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
        marksObtained
      };
    });
    
    
    const participation = await Participation.create({
      studentId: userId,
      quizId,
      answers: processedAnswers,
      totalScore
    });
    
    
    if (user && !user.participatedQuizzes.includes(quizId as any)) {
      user.participatedQuizzes.push(quizId as any);
      await user.save();
    }
    
    res.status(201).json({ 
      success: true, 
      data: {
        participation,
        totalScore,
        maxScore: quiz.totalMarks
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const { participationId } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }
    
    
    const participation = await Participation.findById(participationId)
      .populate('quizId')
      .populate({
        path: 'answers.questionId',
        select: 'text options correctAnswer explanation'
      });
    
    if (!participation) {
      return res.status(404).json({ success: false, message: 'পার্টিসিপেশন পাওয়া যায়নি' });
    }
    
    
    if (participation.studentId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'অনুমোদিত নয়' });
    }
    
    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getStudentParticipations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }
    
    const participations = await Participation.find({ studentId: userId })
      .populate('quizId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: participations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};