import { useEffect, useReducer } from "react";

import { useQuizStorage } from "./useQuizStorage.hook";
import { initialState } from "../store.constants";
import { quizReducer } from "../reducer";
import { QuizContext } from "../QuizContext";
import type { QuizProviderProps } from "./QuizProvider.types";

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [localStorageState, setLocalStorageState] = useQuizStorage(
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