import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { QuizListProps } from "../types/types";

export const QuizList: React.FC<QuizListProps> = ({ quiz }) => {
  const { dispatch } = useContext(QuizContext);
  const { state } = useContext(QuizContext);

  const handleStartQuiz = (id: string) => {
    dispatch({ type: "START_QUIZ", payload: id });
  };

  const handleStartEditingQuiz = (id: string) => {
    dispatch({ type: "START_EDITING_QUIZ", payload: id });
    console.log(quiz.title);
  };

  const handleDelteQuiz = (id: string) => {
    dispatch({ type: "DELETE_QUIZ", payload: id });
    console.log(state.quizes);
  };

  return (
    <ul className="">
      <li className=" grid-flow-row">
        <div
          className="
                m-4
                grid grid-cols-2
                items-center
                border-yellow-300 
                border-2 
                rounded-lg
                bg-gradient-to-r
                from-yellow-100 to-yellow-300"
        >
          <p
            onClick={() => handleStartQuiz(quiz.id)}
            className="
                  text-2xl
                text-black
                hover:text-yellow-300"
          >
            {quiz.title}
          </p>
          <div className=" m-4">
            <button
              onClick={() => handleStartEditingQuiz(quiz.id)}
              className="m-3 hover:text-yellow-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelteQuiz(quiz.id)}
              className="hover:text-yellow-300"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
};
