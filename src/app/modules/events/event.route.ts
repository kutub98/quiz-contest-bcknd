import { Router } from "express";
import { createEvent, getEvents, getEventById } from "./event.controller";
import { getActiveEvents, registerForEvent, getRegisteredEvents, getEventQuizzesForStudent, getStudentEventResults } from "./event.participation.controller";
import { authenticate } from "../../middleware/auth.middleware";

const EventRouter = Router();


EventRouter.post("/", authenticate, createEvent);     
EventRouter.get("/", authenticate, getEvents);         
EventRouter.get("/:id", authenticate, getEventById);  


EventRouter.get("/active", getActiveEvents);  
EventRouter.post("/:eventId/register", authenticate, registerForEvent);  
EventRouter.get("/registered", authenticate, getRegisteredEvents);  
EventRouter.get("/:eventId/quizzes", authenticate, getEventQuizzesForStudent);  
EventRouter.get("/:eventId/results", authenticate, getStudentEventResults);  

export { EventRouter };