import { Router } from "express";
import { createQuiz, getQuizzes, getQuizById } from "./quiz.controller";

const QuizRouter = Router();

QuizRouter.post("/",  createQuiz);
QuizRouter.get("/",  getQuizzes);
QuizRouter.get("/:id",  getQuizById);


export { QuizRouter };