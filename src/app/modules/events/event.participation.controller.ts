import { Request, Response } from 'express';
import { Event } from './event.model';
import { Quiz } from '../quiz/quiz.modal';
import { User } from '../User/user.model';
import { AuthRequest } from '../../middleware/auth.middleware';
import mongoose from 'mongoose';

export const getActiveEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      isActive: true,
      status: { $in: ['upcoming', 'ongoing'] },
    })
      .populate('quizzes')
      .sort({ startDate: 1 });

    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }

    const event = await Event.findById(eventId);
    if (!event || !event.isActive) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'ইভেন্ট পাওয়া যায়নি বা নিষ্ক্রিয়',
        });
    }

    if (event.status === 'completed') {
      return res
        .status(400)
        .json({ success: false, message: 'ইভেন্ট ইতিমধ্যে শেষ হয়েছে' });
    }

    if (event.participants.includes(userId as any)) {
      n;
      return res
        .status(400)
        .json({
          success: false,
          message: 'আপনি ইতিমধ্যে এই ইভেন্টের জন্য রেজিস্টার্ড',
        });
    }

    event.participants.push(userId as any);
    await event.save();

    const user = await User.findById(userId);
    if (user && !user.participatedEvents.includes(eventId as any)) {
      user.participatedEvents.push(eventId as any);
      await user.save();
    }

    res.json({
      success: true,
      message: 'ইভেন্টের জন্য সফলভাবে রেজিস্টার্ড হয়েছেন',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRegisteredEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }

    const user = await User.findById(userId).populate('participatedEvents');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি' });
    }

    res.json({ success: true, data: user.participatedEvents });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventQuizzesForStudent = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }

    const event = await Event.findById(eventId);
    if (!event || !event.participants.includes(userId as any)) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'ইভেন্ট পাওয়া যায়নি বা রেজিস্টার্ড নয়',
        });
    }

    const quizzes = await Quiz.find({
      eventId,
      isActive: true,
    }).populate('questions');

    const user = await User.findById(userId);
    const availableQuizzes = quizzes.filter(
      (quiz) => !user?.participatedQuizzes.includes(quiz._id),
    );

    res.json({ success: true, data: availableQuizzes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentEventResults = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'ব্যবহারকারী অথেনটিকেটেড নয়' });
    }

    const event = await Event.findById(eventId);
    if (!event || !event.participants.includes(userId as any)) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'ইভেন্ট পাওয়া যায়নি বা রেজিস্টার্ড নয়',
        });
    }

    const Participation = mongoose.model('Participation');
    const participations = await Participation.find({
      studentId: userId,
    }).populate({
      path: 'quizId',
      match: { eventId: eventId },
      populate: { path: 'eventId', select: 'title' },
    });

    const eventParticipations = participations.filter(
      (p) => p.quizId && (p.quizId as any).eventId._id.toString() === eventId,
    );

    res.json({ success: true, data: eventParticipations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
