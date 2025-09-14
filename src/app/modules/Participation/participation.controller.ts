import { Request, Response } from 'express';
import { Participation } from './participation.model';

export const createParticipation = async (req: Request, res: Response) => {
  try {
    const participation = await Participation.create(req.body);
    res.status(201).json({ success: true, data: participation });
  } catch (error: any) {
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
