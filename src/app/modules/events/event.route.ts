import { Router } from "express";
import { createEvent, getEvents, getEventById } from "./event.controller";

const EventRouter = Router();


EventRouter.post("/",  createEvent);     
EventRouter.get("/",  getEvents);         
EventRouter.get("/:id",  getEventById);  



export { EventRouter };