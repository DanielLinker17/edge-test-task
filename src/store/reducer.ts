import { getCurrentQuestionAndQuiz } from "../helpers/getCurrentQuestionAndQuiz";
import type { State, Action } from "./store.types";
import type { Quiz } from "../types";

// TODO: Looks like you used chat gpt here :)
export const quizReducer = (state: State, action: Action): State => {
  const { targetQuiz: currentQuiz } = getCurrentQuestionAndQuiz(
    state.quizes,
    state.currentQuizId,
    state.currentQuestionIndex
  );

  const maxIndex = currentQuiz.questions.length;

  switch (action.type) {
    case "START_ADDING_NEW_QUIZ":
      return { ...state, isAddingNewQuiz: true, newQuizTitle: action.payload };

    case "ADD_QUIZ":
      return {
        ...state,
        quizes: [...state.quizes, action.payload],
        isAddingNewQuiz: false,
        newQuizTitle: "",
      };

    case "START_EDITING_QUIZ":
      return { ...state, isQuizEditing: true, editingQuizId: action.payload };

    case "STOP_EDIT_QUIZ":
      return {
        ...state,
        quizes: state.quizes.map((quiz: Quiz) =>
          quiz.id === action.payload.id ? { ...action.payload } : quiz
        ),
        isQuizEditing: false,
        editingQuizId: "",
      };

    case "DELETE_QUIZ": {
      const filteredQuizzes = state.quizes.filter(
        (quiz: Quiz) => quiz.id !== action.payload
      );
      const nextQuizId =
        filteredQuizzes.length > 0 ? filteredQuizzes[0].id : state.quizes[0].id;
      return {
        ...state,
        quizes: filteredQuizzes,
        currentQuizId: nextQuizId,
      };
    }

    case "START_QUIZ":
      return {
        ...state,
        isQuizStarted: true,
        currentQuizId: action.payload,
      };

    case "GO_BACK":
      return { ...state, isAddingNewQuiz: false, isQuizEditing: false };

    case "NEXT_QUESTION":
      if (state.currentQuestionIndex + 1 === maxIndex) {
        return {
          ...state,
          userAnswers: [...state.userAnswers, action.payload],
          quizFinished: true,
        };
      } else {
        return {
          ...state,
          secondsRemining: 10,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          userAnswers: [...state.userAnswers, action.payload],
        };
      }

    case "HANDLE_TIMER":
      return { ...state, secondsRemining: state.secondsRemining - 1 };

    case "RESET_QUIZ":
      return {
        ...state,
        isQuizStarted: false,
        quizFinished: false,
        userAnswers: [],
        currentQuestionIndex: 0,
        secondsRemining: 10,
      };

    default:
      return state;
  }
};