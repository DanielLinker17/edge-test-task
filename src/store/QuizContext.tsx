/* eslint-disable no-case-declarations */
import { createContext, useEffect, useReducer } from "react";
import { initialQuestions } from "../api/initialQuestionsList";
import { Action, Quiz, QuizProviderProps, State } from "../types/types";
import { createUniqueId } from "../helpers/createUniqueId";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getCurrentQuestionAndQuiz } from "../helpers/getCurrentQuestionAndQuiz";

const initialQuiz: Quiz = {
  title: "React Quiz",
  id: createUniqueId(),
  questions: initialQuestions,
};

const initialState: State = {
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

const quizReducer = (state: State, action: Action): State => {
  const { targetQuiz: currentQuiz } =
    getCurrentQuestionAndQuiz(
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
        quizes: state.quizes.map((quiz) =>
          quiz.id === action.payload.id ? { ...action.payload } : quiz
        ),
        isQuizEditing: false,
        editingQuizId: "",
      };

    case "DELETE_QUIZ":
      const nextQuizIndex = state.quizes.findIndex((quiz) => quiz.id === action.payload);
      let nextQuizId = "";
      if (nextQuizIndex !== -1) {
        if (nextQuizIndex + 1 < state.quizes.length) {
          nextQuizId = state.quizes[nextQuizIndex + 1].id;
        } else {
          nextQuizId = state.quizes[0].id;
        }
      }
      return {
        ...state,
        quizes: state.quizes.filter((quiz) => quiz.id !== action.payload),
        currentQuizId: nextQuizId,
      };

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

export const QuizContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    "quizes",
    initialState
  );

  const [appState, dispatch] = useReducer(quizReducer, localStorageState);

  useEffect(() => {
    let intervalId: number | undefined;

    if (appState.isQuizStarted && !appState.quizFinished) {
      intervalId = setInterval(() => {
        if (appState.secondsRemining > 0) {
          dispatch({ type: "HANDLE_TIMER" });
        } else {
          dispatch({ type: "NEXT_QUESTION", payload: "you didn't answer" });
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [appState.isQuizStarted, appState.quizFinished, appState.secondsRemining]);

  useEffect(() => {
    setLocalStorageState(appState);
  }, [appState, setLocalStorageState]);

  return (
    <QuizContext.Provider value={{ state: appState, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
