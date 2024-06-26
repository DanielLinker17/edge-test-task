import { Quiz, Question } from "../types/types.ts";

/**
 * Retrieves the current question and quiz based on the provided quiz ID and question index.
 *
 * @param {Quiz[]} quizzes - The array of quizzes.
 * @param {string} currentQuizId - The ID of the current quiz.
 * @param {number} currentQuestionIndex - The index of the current question.
 * @returns {{ currentQuestion: Question, targetQuiz: Quiz }} - An object containing the current question and the target quiz.
 * @throws Will throw an error if the quiz or question cannot be found.
 */
export function getCurrentQuestionAndQuiz(
  quizzes: Quiz[],
  currentQuizId: string,
  currentQuestionIndex: number
): { currentQuestion: Question; targetQuiz: Quiz } {
  const targetQuiz = quizzes.find((quiz) => quiz.id === currentQuizId);
  if (!targetQuiz) {
    throw new Error(`Quiz with ID ${currentQuizId} not found`);
  }

  const currentQuestion = targetQuiz.questions[currentQuestionIndex];
  if (!currentQuestion) {
    throw new Error(
      `Question at index ${currentQuestionIndex} not found in quiz with ID ${currentQuizId}`
    );
  }

  return { currentQuestion, targetQuiz };
}

/**
 * Retrieves the current quiz based on the provided quiz ID.
 *
 * @param {Quiz[]} quizzes - The array of quizzes.
 * @param {string} currentQuizId - The ID of the current quiz.
 * @returns {Quiz} - The target quiz.
 * @throws Will throw an error if the quiz cannot be found.
 */
export function getCurrentQuiz(quizzes: Quiz[], currentQuizId: string): Quiz {
  const targetQuiz = quizzes.find((quiz) => quiz.id === currentQuizId);
  if (!targetQuiz) {
    throw new Error(`Quiz with ID ${currentQuizId} not found`);
  }

  return targetQuiz;
}
