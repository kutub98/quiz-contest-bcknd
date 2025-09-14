import mongoose, { Schema } from "mongoose";

export interface IQuestion extends Document {
  quizId: mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctAnswer: string;
  marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const QuestionSchema = new Schema<IQuestion>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    marks: { type: Number, default: 1, min: 1 },
    explanation: { type: String },
    difficulty: { 
      type: String, 
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);