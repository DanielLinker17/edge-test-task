import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { getCurrentQuiz } from "../helpers/getCurrentQuestionAndQuiz";
import { Question } from "../types/types";

export const Statistics: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { userAnswers, score } = state;
  const currentQuiz = getCurrentQuiz(state.quizes, state.currentQuizId);

  const maxPoints = currentQuiz?.questions.reduce((acc:number, question: Question) => {
    if (question.difficulty === "easy") {
      return acc + 10;
    } else if (question.difficulty === "medium") {
      return acc + 20;
    } else {
      return acc + 30;
    }
  }
  , 0);


  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-300 mb-10">
        Congratulations, you have finished the quiz!
      </h2>
      <h3 className="text-xl font-bold text-yellow-300">
        your score is: {score} out of {maxPoints}
      </h3>
      <h3 className="text-xl font-bold text-yellow-300">
        Now check your answers to see if there any place to improve:
      </h3>
      <ul
        className="
        bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-800
        mt-10
        p-10
      border-gray-600
        rounded-lg
        border-2
        shadow-md
      shadow-white
        space-y-10
        "
      >
        {currentQuiz?.questions.map((question, index) => (
          <li key={index} className="">
            <p className=" divide-x">{index + 1}</p>
            <p className=" text-lg">
              <span className="font-bold under">
                Question: {question.title}
              </span>
            </p>
            {userAnswers[index] === question.rightAnswer ? (
              <p>
                <span className="font-bold text-green-700">
                  You answered right: {userAnswers[index]}
                </span>
              </p>
            ) : (
              <p>
                <span className="font-bold text-red-700">
                  Your answer: {userAnswers[index]}
                </span>

                <p>
                  <span className="text-gray-300 font-bold">
                    Right answer: {question.rightAnswer}
                  </span>
                </p>
              </p>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleReset}
        className="
          m-10
        bg-gray-800
        text-xl
        text-yellow-400"
      >
        Back to the beginning
      </button>
    </div>
  );
};
