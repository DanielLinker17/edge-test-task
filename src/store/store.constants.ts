import { initialQuestions } from "../api/initialQuestionsList";
import { createUniqueId } from "../helpers/createUniqueId";
import type { Quiz } from "../types";
import type { State } from "./store.types";

const initialQuiz: Quiz = {
  title: "React Quiz",
  id: createUniqueId(),
  questions: initialQuestions,
};

export const initialState: State = {
  quizes: [{ ...initialQuiz }],
  currentQuizId: initialQuiz.id,
  isAddingNewQuiz: false,
  newQuizTitle: "",
  isQuizEditing: false,
  editingQuizId: "",
  isQuizStarted: false,
  quizFinished: false,
  userAnswers: [],
  currentQuestionIndex: 0,
  secondsRemining: 10,
};