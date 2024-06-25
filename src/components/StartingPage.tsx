import { useContext, useRef } from "react";
import { QuizList } from "./QuizList";
import { QuizContext } from "../store/QuizContext";

export const StartingPage: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { quizes } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartAddingNewQuiz = () => {
    if (inputRef.current !== null && inputRef.current.value.trim() !== "") {
      dispatch({
        type: "START_ADDING_NEW_QUIZ",
        payload: inputRef.current.value,
        
      });
    }
    console.log(state);
  };

  return (
    <div className="flex-col items-center space-y-10 border-2 border-yellow-300 rounded-xl p-10">
      <header>
        <h1 className="text-5xl text-yellow-600 mb-8">Choose Quiz</h1>
      </header>
      {quizes.map((quiz) => (
        <QuizList quiz={quiz} />
      ))}
      <div className=" flex-col itmes-center space-y-5">
        <h2 className="text-2xl font-bold text-gray-600 mt-5">
          or create new one
        </h2>
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Quiz title"
            className="border-2 border-gray-800 rounded-lg p-2 m-2 w-full"
            defaultValue={""}
          />
          <button
            className="hover:text-yellow-300"
            onClick={handleStartAddingNewQuiz}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
