import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import Timer from "./Timer";
import {getCurrentQuestionAndQuiz} from "../helpers/getCurrentQuestionAndQuiz";

export const QuizQuestions: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { currentQuestionIndex, currentQuizId, quizes } = state;
  const { currentQuestion, targetQuiz } = getCurrentQuestionAndQuiz(quizes, currentQuizId, currentQuestionIndex);

  const handleNextQuestion = (answer: string) => {
    dispatch({ type: "NEXT_QUESTION", payload: answer});
    console.log(currentQuestionIndex);
  };

  return (
    <>
    <Timer />
    <div
      className="bg-yellow-300 rounded-lg p-5 border border-gray-800"
      style={{
        minWidth: '300px',
        minHeight: '300px', 
        width: '50vw',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 className="text-2xl font-bold text-gray-600 mb-10">
        {currentQuestion?.title}
      </h2>
      <h3 className="text-xl font-bold text-gray-600">
        {currentQuestionIndex + 1}/{targetQuiz?.questions.length}
      </h3>
      <ul className="overflow-y-auto max-h-400 flex-grow">
        {currentQuestion?.answers.map((answer, index) => (
          <li key={index} 
          className="
          text-xl
          text-gray-600
          font-semibold
          hover:text-gray-800
          hover:bg-yellow-200
          hover:shadow-lg
          hover:rounded-lg
          hover:cursor-pointer m-5"
          onClick={() => handleNextQuestion(answer)}>
              {answer}
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};
