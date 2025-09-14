import { Router } from "express";
import {
  createParticipation,
  getParticipations,
  getParticipationById,
} from "./participation.controller";

const ParticipationRouter = Router();

ParticipationRouter.post("/", createParticipation);
ParticipationRouter.get("/", getParticipations);
ParticipationRouter.get("/:id", getParticipationById);

export { ParticipationRouter };
