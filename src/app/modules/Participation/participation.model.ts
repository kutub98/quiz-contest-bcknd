import mongoose, { Schema } from 'mongoose';

export interface IParticipation extends Document {
  studentId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
    marksObtained: number;
  }[];
  totalScore: number;
  status: 'completed' | 'failed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const ParticipationSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: { type: String },
        isCorrect: { type: Boolean, default: false },
        marksObtained: { type: Number, default: 0 },
      },
    ],
    totalScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Add index to prevent duplicate participations
ParticipationSchema.index({ studentId: 1, quizId: 1 }, { unique: true });

export const Participation = mongoose.model<IParticipation>(
  'Participation',
  ParticipationSchema,
);
