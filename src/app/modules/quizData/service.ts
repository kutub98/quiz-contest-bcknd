import { QuizModel } from "./models";
import type { QuizSchemaType } from "./validators";


 const createQuiz = async (data: QuizSchemaType) => {
  const quiz = new QuizModel(data);
  return await quiz.save();
};

 const updateQuizById = async (id: string, data: QuizSchemaType) => {
  return await QuizModel.findByIdAndUpdate(id, data, { new: true });
};

 const getQuizById = async (id: string) => {
  return await QuizModel.findById(id);
};

 const getAllQuizzes = async () => {
  return await QuizModel.find();
};


export const QuizService = {
  getAllQuizzes,
  getQuizById,
  updateQuizById,
  createQuiz,
};
