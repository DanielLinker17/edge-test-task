import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { QuizListProps } from "../types/types";

export const QuizList: React.FC<QuizListProps> = ({ quiz }) => {
  const { state, dispatch } = useContext(QuizContext);
  const isOnlyOneQuiz = state.quizes.length === 1;

  const handleStartQuiz = (id: string) => {
    dispatch({ type: "START_QUIZ", payload: id });
  };

  const handleStartEditingQuiz = (id: string) => {
    dispatch({ type: "START_EDITING_QUIZ", payload: id });
    console.log(quiz.title);
  };

  const handleDeleteQuiz = (id: string) => {
    dispatch({ type: "DELETE_QUIZ", payload: id });
    console.log(state.quizes);
  };

  return (
    <ul className="border-2 border-yellow-300 rounded-lg sm:w-96 p-4">
      <li className="flex flex-col items-center space-y-3">
        <button
          onClick={() => handleStartQuiz(quiz.id)}
          className="text-2xl hover:text-yellow-300 cursor-pointer bg-transparent hover:animate-pulse"
        >
          {quiz.title}
        </button>
        <div className="flex space-x-5">
          <button
            className="m-3 hover:text-yellow-300 cursor-pointer"
            onClick={() => handleStartEditingQuiz(quiz.id)}
          >
            Edit
          </button>
          <button
            disabled={isOnlyOneQuiz}
            onClick={() => handleDeleteQuiz(quiz.id)}
            className="m-3 hover:text-yellow-300 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  );
};
