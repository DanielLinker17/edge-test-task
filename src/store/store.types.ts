import type { Quiz } from "../types";

// Try to use types within components where they are used in
export type Action =
  | { type: "START_ADDING_NEW_QUIZ"; payload: string }
  | { type: "GO_BACK" }
  | { type: "START_EDITING_QUIZ"; payload: string }
  | { type: "START_QUIZ"; payload: string }
  | { type: "NEXT_QUESTION"; payload: string }
  | { type: "ADD_QUIZ"; payload: Quiz }
  | { type: "DELETE_QUIZ"; payload: string }
  | { type: "START_EDIT_QUIZ"; payload: string }
  | { type: "STOP_EDIT_QUIZ"; payload: Quiz }
  | { type: "RESET_QUIZ" }
  | { type: "HANDLE_TIMER" };

export type State = {
  quizes: Quiz[];
  newQuizTitle: string;
  isQuizEditing: boolean;
  editingQuizId: string;
  isAddingNewQuiz: boolean;
  isQuizStarted: boolean;
  currentQuizId: string;
  quizFinished: boolean;
  userAnswers: string[];
  currentQuestionIndex: number;
  secondsRemining: number;
};
