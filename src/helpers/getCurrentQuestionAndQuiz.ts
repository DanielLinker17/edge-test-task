import { Quiz, Question } from '../types/types.ts';

export function getCurrentQuestionAndQuiz(quizes: Quiz[], currentQuizId: string, currentQuestionIndex: number): { currentQuestion: Question, targetQuiz: Quiz } {
  const targetQuiz = quizes.find((quiz) => quiz.id === currentQuizId) as Quiz;
  const currentQuestion = targetQuiz.questions[currentQuestionIndex] as Question;
  return { currentQuestion, targetQuiz };
}

export function getCurrentQuiz(quizes: Quiz[], currentQuizId: string): Quiz {
  return quizes.find((quiz) => quiz.id === currentQuizId) as Quiz;
}
