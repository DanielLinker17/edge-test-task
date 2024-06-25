import { useContext } from "react";
import "./App.css";
import { StartingPage } from "./components/StartingPage";
import { QuizContext } from "./store/QuizContext";
import { QuizQuestions } from "./components/QuizQuestions";
import { Statistics } from "./components/Statistics";
import { QuizForm } from "./components/QuizForm";

function App() {
  const { state } = useContext(QuizContext);
  const { isQuizStarted, quizFinished, isAddingNewQuiz, isQuizEditing } = state;

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
