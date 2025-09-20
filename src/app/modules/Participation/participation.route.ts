import { Router } from "express";
import { 
  createParticipation, 
  getParticipations, 
  getParticipationById,
  checkParticipation
} from "./participation.controller";

const ParticipationRouter = Router();

ParticipationRouter.post("/", createParticipation);
ParticipationRouter.get("/", getParticipations);
ParticipationRouter.get("/:id", getParticipationById);
ParticipationRouter.post("/check", checkParticipation);

export { ParticipationRouter };