import mongoose, { Schema, Document } from 'mongoose';
import type { QuizData } from './interface';


export interface IQuiz extends Document, QuizData {}

const QuizSchema: Schema = new Schema({
  quizInfo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  competitionDetails: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  rules: {
    title: { type: String, required: true },
    items: { type: [String], required: true },
  },
});

export const QuizModel = mongoose.model<IQuiz>('Quiz', QuizSchema);
