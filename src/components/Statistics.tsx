import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { getCurrentQuiz } from "../helpers/getCurrentQuestionAndQuiz";

export const Statistics: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { userAnswers, score } = state;
  const currentQuiz = getCurrentQuiz(state.quizes, state.currentQuizId);

  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  return (
    <div
      className="
      bg-gradient-to-r
      from-yellow-200 to-yellow-600
      rounded-lg
      p-5
      border
    border-gray-800"
    >
      <h2 className="text-2xl font-bold text-gray-600 mb-10">
        Congratulations, you have finished the quiz!
      </h2>
      <h3 className="text-xl font-bold text-gray-600">your score is:{score}</h3>
      <h3 className="text-xl font-bold text-gray-600">
        Now check your answers to see if there any place to improve:
      </h3>
      <ul
        className="
        overflow-y-auto
        flex-grow
        mt-10
        p-10
      border-gray-600
        rounded-lg
        border-2"
      >
        {currentQuiz?.questions.map((question, index) => (
          <li key={index} className="text-gray-600 m-10">
            <p className=" text-lg">
              <span className="font-bold under">
                Question: {question.title}
              </span>
            </p>
            {userAnswers[index] === question.rightAnswer ? (
              <p>
                <span className="font-bold">
                  You answered right:{userAnswers[index]}
                </span>
              </p>
            ) : (
              <p>
                <span className="font-bold">
                  Your answer:{userAnswers[index]}
                </span>

                <p>
                  <span className="text-gray-800 font-bold">
                    Right answer:{question.rightAnswer}
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
          m-4
        bg-gray-800
        text-xl
        text-yellow-400"
      >
        Back to the beginning
      </button>
    </div>
  );
};
