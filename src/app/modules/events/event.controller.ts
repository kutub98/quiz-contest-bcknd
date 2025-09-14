import { Request, Response } from "express";
import { Event } from "./event.model";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("quizzes");
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Event
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id).populate("quizzes");
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
