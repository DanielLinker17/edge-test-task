import { useContext } from "react";

import {
  StartingPage,
  QuizQuestions,
  Statistics,
  QuizForm,
} from "./components";
import { QuizContext } from "./store/QuizContext";

import "./App.css";

function App() {
  const { state } = useContext(QuizContext);
  const { isQuizStarted, quizFinished, isAddingNewQuiz, isQuizEditing } = state;

  // I'll use a react-router instead
  return (
    <>
      {!isQuizStarted && !isAddingNewQuiz && !isQuizEditing && <StartingPage />}
      {isQuizStarted && !state.quizFinished && <QuizQuestions />}
      {quizFinished && <Statistics />}
      {(isQuizEditing || isAddingNewQuiz) && <QuizForm />}
    </>
  );
}

export default App;
