import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addParticipant,
  getEventWithParticipants,
} from './event.controller';

// import {
// createEvent,
// getEvents,
// getEventById,
// updateEvent,
// deleteEvent,
// addParticipant,
// getEventWithParticipants,
// } from './event.controller';
const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.get('/:id/participants', getEventWithParticipants);
router.post('/add-participant', addParticipant);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export const EventRouter = router;
