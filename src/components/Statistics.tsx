import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { getCurrentQuiz } from "../helpers/getCurrentQuestionAndQuiz";
import { Question } from "../types/types";

export const Statistics: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { userAnswers } = state;
  const currentQuiz = getCurrentQuiz(state.quizes, state.currentQuizId);

  const score = userAnswers.reduce((acc: number, userAnswer, index) => {
    if (userAnswer === currentQuiz.questions[index].rightAnswer) {
      const points =
        currentQuiz.questions[index].difficulty === "easy"
          ? 10
          : currentQuiz.questions[index].difficulty === "medium"
          ? 20
          : 30;
      return acc + points;
    } else {
      return acc;
    }
  }, 0);

  const maxPoints = currentQuiz.questions.reduce(
    (acc: number, question: Question) => {
      if (question.difficulty === "easy") {
        return acc + 10;
      } else if (question.difficulty === "medium") {
        return acc + 20;
      } else {
        return acc + 30;
      }
    },
    0
  );

  const percentageRight = ((score / maxPoints) * 100).toFixed(1);

  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  return (
    <div className=" space-y-10">
      <div className=" space-y-10">
        <h2 className="text-5xl text-yellow-300">
          Congratulations, you have finished the quiz!
        </h2>
        <h3 className="text-xl rounded-full inline-block p-2 border-yellow-300 border-2 font-bold">
          Right answers : {percentageRight}%
        </h3>
      </div>
      <ul
        className="
        mt-10
        p-10
      border-yellow-300
        rounded-lg
        border-2
        space-y-10
        "
      >
        {currentQuiz?.questions.map((question, index) => (
          <li key={index} className="">
            <p className="rounded-full inline-block p-2 bg-yellow-300 font-bold">
              Nº{index + 1}
            </p>
            <p className="text-lg">
              <span className="font-bold under">
                Question: {question.title}
              </span>
            </p>
            {userAnswers[index] === question.rightAnswer ? (
              <p>
                <span className="font-bold text-yellow-300">
                  You answered right: {userAnswers[index]}
                </span>
              </p>
            ) : (
              <p>
                <span className="font-bold text-red-900">
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
      <button onClick={handleReset} className="text-2xl hover:text-yellow-300">
        Back to the beginning
      </button>
    </div>
  );
};
