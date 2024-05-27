import { useContext } from "react";
import "./App.css";
import { StartingPage } from "./components/StartingPage";
import { QuizContext } from "./store/QuizContext";
import { QuizQuestions } from "./components/QuizQuestions";
import { Statistics } from "./components/Statistics";
import { NewQuizForm } from "./components/NewQuizForm";
import {QuizRedactor} from "./components/QuizRedactor";


function App() {
  const { state } = useContext(QuizContext);
  const { isQuizStarted, quizFinished, isAddingNewQuiz,isQuizEditing } = state;

  return (
    <>
      {!isQuizStarted && !isAddingNewQuiz && !isQuizEditing && <StartingPage />}
      {isQuizStarted && !state.quizFinished && <QuizQuestions />}
      {quizFinished && <Statistics />}
      {isAddingNewQuiz && <NewQuizForm />}
      {isQuizEditing && <QuizRedactor />}
    </>
  );
}

export default App;
