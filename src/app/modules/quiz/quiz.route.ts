import { Router } from "express";
import { createQuiz, getQuizzes, getQuizById } from "./quiz.controller";
import { getQuizForParticipation, submitQuiz, getQuizResult, getStudentParticipations } from "./quiz.participation.controller";
import { authenticate } from "../../middleware/auth.middleware";

const QuizRouter = Router();

QuizRouter.post("/", authenticate, createQuiz);
QuizRouter.get("/", authenticate, getQuizzes);
QuizRouter.get("/:id", authenticate, getQuizById);

QuizRouter.get("/:quizId/participate", authenticate, getQuizForParticipation);
QuizRouter.post("/:quizId/submit", authenticate, submitQuiz);
QuizRouter.get("/result/:participationId", authenticate, getQuizResult);
QuizRouter.get("/participations/mine", authenticate, getStudentParticipations);

export { QuizRouter };