import { useState } from "react";
import type { State } from "../store.types";

export const useQuizStorage = (key: string, initialValue: unknown) => {
  const item = window.localStorage.getItem(key);

  const [storedState, setStoredState] = useState(
    item ? JSON.parse(item) : initialValue
  );

  const setValue = (value: State) => {
    try {
      setStoredState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedState, setValue];
};
