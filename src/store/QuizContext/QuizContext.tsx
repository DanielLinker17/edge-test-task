import { createContext } from "react";

import { initialState } from "../store.constants";
import type { ContextProps } from "./QuizContext.types";

export const QuizContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});
