import { useContext } from "react";

import { QuizContext } from "../../store/QuizContext/QuizContext";
import { getCurrentQuestionAndQuiz } from "../../helpers/getCurrentQuestionAndQuiz";

import { Timer } from "../Timer/Timer";

export const QuizQuestions: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { currentQuestionIndex, currentQuizId, quizes } = state;
  const { currentQuestion, targetQuiz } = getCurrentQuestionAndQuiz(
    quizes,
    currentQuizId,
    currentQuestionIndex
  );

  const handleNextQuestion = (answer: string) => {
    dispatch({ type: "NEXT_QUESTION", payload: answer });
    console.log(currentQuestionIndex);
  };

  return (
    <>
      <Timer />
      <div
        className="rounded-lg p-5 border-4 border-yellow-300"
        style={{
          minWidth: "300px",
          maxWidth: "600px",
          width: "80vw",
          height: "70vh", // Fixed height for stability
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <h2 className="text-2xl font-bold text-yellow-300 text-center">
          {currentQuestion?.title}
        </h2>
        <h3 className="text-xl font-bold text-gray-600 text-center my-4">
          {currentQuestionIndex + 1}/{targetQuiz?.questions.length}
        </h3>
        <ul className="w-full flex-grow flex flex-col justify-center items-center overflow-y-auto">
          {currentQuestion?.answers.map((answer, index) => (
            <li
              key={index}
              className="
                text-xl
                font-semibold
                text-center
                py-2
                px-4
                mb-2
                hover:text-gray-800
                hover:bg-yellow-300
                hover:shadow-lg
                hover:rounded-lg
                hover:cursor-pointer
                transition
                duration-300
                ease-in-out
              "
              onClick={() => handleNextQuestion(answer)}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
