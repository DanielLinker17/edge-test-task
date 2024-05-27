import { useContext, useRef } from "react";
import { Header } from "./Header";
import { QuizList } from "./QuizList";
import { QuizContext } from "../store/QuizContext";

export const StartingPage: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { quizes } = state;
  const inputRef = useRef<HTMLInputElement>(null);


  const handleStartAddingNewQuiz = () => {
      if(inputRef.current !== null && inputRef.current.value.trim() !== ""){
        dispatch({ type: "START_ADDING_NEW_QUIZ", payload: inputRef.current.value });
      }
  };

  return (
    <>
      <Header />
      {quizes.map((quiz) => (
        <QuizList key={quiz.id} quiz={quiz} />
      ))}
      <div className="m-10 text-xl font-bold text-yellow-500">or</div>
      <h2 className="text-2xl font-bold text-gray-600 mt-5">Add a new quiz</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Quiz title"
        className="border-2 border-gray-800 rounded-lg p-2 m-2"
        defaultValue={""}
      />
      <button  onClick={handleStartAddingNewQuiz}className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-800">Submit</button>
    </>
  );
};
