import { useState } from 'react';
import { State } from '../types/types';


export const useLocalStorage = (key: string, initialValue: unknown) => {
  const [storedState, setStoredState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

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
