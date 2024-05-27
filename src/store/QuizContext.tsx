/* eslint-disable @typescript-eslint/no-unused-vars */
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
  isEditing: false,
};

const initialState: State = {
  quizes: [{ ...initialQuiz }],
  currentQuizId: initialQuiz.id,
  isAddingNewQuiz: false,
  newQuizTitle: "",
  isQuizEditing: false,
  editingQuizId : '',
  isQuizStarted: false,
  quizFinished: false,
  userAnswers: [],
  currentQuestionIndex: 0,
  secondsRemining: 10,
  score: 0,
};

const quizReducer = (state: State, action: Action) => {
  const { currentQuestion, targetQuiz: currentQuiz } =
    getCurrentQuestionAndQuiz(
      state.quizes,
      state.currentQuizId,
      state.currentQuestionIndex
    );

  const maxIndex = currentQuiz.questions.length;
  const difficulty = currentQuestion.difficulty;
  const points =
    (difficulty === "easy" && 1) ||
    (difficulty === "medium" && 2) ||
    (difficulty === "hard" && 3) ||
    0;

  switch (action.type) {
    case "START_ADDING_NEW_QUIZ": {
      return { ...state, isAddingNewQuiz: true, newQuizTitle: action.payload };
    }

    case "ADD_QUIZ": {
      return {
        ...state,
        quizes: [...state.quizes, action.payload],
        isAddingNewQuiz: false,
        newQuizTitle: "",
      };
    }

    case 'START_EDITING_QUIZ': {
      return { ...state, isQuizEditing: true, editingQuizId: action.payload };
    }

    case 'STOP_EDIT_QUIZ' :
      return {
      ...state,
      quizes: state.quizes.map(quiz => {
        if (quiz.id === action.payload.id) {
        return action.payload;
        }
        return quiz;
      }),
      isQuizEditing: false,
      editingQuizId: '',
      }
    case "DELETE_QUIZ":
      return {
        ...state,
        quizes: state.quizes.filter((quiz) => quiz.id !== action.payload),
      };
    case "START_QUIZ":
      return {
        ...state,
        isQuizStarted: true,
        currentQuizId: action.payload,
      };
    case "NEXT_QUESTION":
      console.log(
        currentQuestion?.rightAnswer,
        currentQuestion?.difficulty,
        action.payload,
        points,
        state.score
      );
      {
        if (state.currentQuestionIndex + 1 === maxIndex) {
          return {
            ...state,
            score:
            currentQuestion?.rightAnswer.includes(action.payload)
                ? state.score + points
                : state.score,
            userAnswers: [...state.userAnswers, action.payload],
            quizFinished: true,
          };
        } else {
          return {
            ...state,
            score:
              currentQuestion?.rightAnswer.includes(action.payload)
                ? state.score + points
                : state.score,
            secondsRemining: 10,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            userAnswers: [...state.userAnswers, action.payload],
          };
        }
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
        score: 0,
      };

    default:
      return state;
  }
};

export const QuizContext = createContext({
  state: initialState,
  dispatch: (_action: Action) => {},
});

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    "quizes",
    initialState
  );

  const [appState, dispatch] = useReducer(quizReducer, localStorageState);

  useEffect(() => {
    let intervalId: number;

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
