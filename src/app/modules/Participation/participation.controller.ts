import { Request, Response } from 'express';
import { Participation } from './participation.model';
import { Event } from '../events/event.model';

export const createParticipation = async (req: Request, res: Response) => {
  try {
    // Create participation
    const participation = await Participation.create(req.body);

    // Update event participants list
    await Event.findByIdAndUpdate(
      participation.quizId,
      {
        $addToSet: { participants: participation.studentId },
      },
      { new: true },
    );

    res.status(201).json({ success: true, data: participation });
  } catch (error: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    // Handle duplicate participation error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already participated in this quiz',
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getParticipations = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find()
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');
    res.json({ success: true, data: participations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getParticipationById = async (req: Request, res: Response) => {
  try {
    const participation = await Participation.findById(req.params.id)
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');
    if (!participation)
      return res
        .status(404)
        .json({ success: false, message: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkParticipation = async (req: Request, res: Response) => {
  try {
    const { studentId, quizId } = req.body;
    const participation = await Participation.findOne({ studentId, quizId });

    if (participation) {
      return res.json({
        success: true,
        hasParticipated: true,
        status: participation.status,
      });
    }

    res.json({ success: true, hasParticipated: false });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateParticipation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const participation = await Participation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    )
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: 'Participation not found',
      });
    }

    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteParticipation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const participation = await Participation.findByIdAndDelete(id);

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: 'Participation not found',
      });
    }

    res.json({ success: true, message: 'Participation deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getParticipationsByQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;

    const participations = await Participation.find({ quizId })
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: participations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
