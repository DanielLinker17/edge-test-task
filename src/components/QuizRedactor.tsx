import { useContext, useState } from "react";
import { QuizContext } from "../store/QuizContext";
import { Question } from "../types/types";
import { getCurrentQuiz } from "../helpers/getCurrentQuestionAndQuiz";

export const QuizRedactor: React.FC = () => {
  const { dispatch, state } = useContext(QuizContext);
  const { quizes, editingQuizId } = state;
  const targetQuiz = getCurrentQuiz(quizes, editingQuizId);

  const [newAnswer, setNewAnswer] = useState("");
  const [newQuestion, setNewQuestion] = useState<Question>({
    title: "",
    answers: [],
    rightAnswer: "",
    difficulty: "",
  });
  const [editingQuiz, setEditingQuiz] = useState({
    ...targetQuiz,
  });

  const handleQuestionTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, title: e.target.value });
  };

  const handleNewAnswer = () => {
    if (newAnswer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }
    setNewQuestion({
      ...newQuestion,
      answers: [...newQuestion.answers, newAnswer],
    });
    setNewAnswer("");
  };

  const handleDeleteAnswer = (index: number) => {
    const newAnswers = newQuestion.answers.filter(
      (_: unknown, answerIndex: number) => answerIndex !== index
    );
    setNewQuestion({ ...newQuestion, answers: newAnswers });
  };

  const handleDifficultyLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, difficulty: e.target.value });
  };

  const handleAddAnotherQuestion = () => {
    if (
      newQuestion.title === "" ||
      newQuestion.answers.length === 0 ||
      newQuestion.rightAnswer === "" ||
      newQuestion.difficulty === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    setEditingQuiz({
      ...editingQuiz,
      questions: [...editingQuiz.questions, { ...newQuestion }],
    });
    setNewQuestion({
      title: "",
      answers: [],
      rightAnswer: "",
      difficulty: "",
    });
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = editingQuiz.questions.filter(
      (_: unknown, questionIndex: number) => questionIndex !== index
    );
    setEditingQuiz({ ...editingQuiz, questions: newQuestions });
  };

  const handleRightAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, rightAnswer: e.target.value });
  };

  const handleSubmit = () => {
    if (editingQuiz.questions.length === 0) {
      alert("Please add some questions to your quiz");
      return;
    }
    dispatch({ type: "STOP_EDIT_QUIZ", payload: editingQuiz });
  };

  return (
    <>
      <div className="border-2 border-yellow-300 rounded-lg p-2">
        <h2 className="text-2xl font-bold text-gray-600 mt-5">
          Add a new question
        </h2>
        <input
          onChange={handleQuestionTitle}
          value={newQuestion.title}
          type="text"
          placeholder="Question title"
          className="border-2 border-gray-800 rounded-lg p-2 m-2 w-full"
        />
        <>
          <h2 className="text-2xl font-bold text-gray-600 mt-5">Add answers</h2>
          <input
            onChange={(e) => setNewAnswer(e.target.value)}
            value={newAnswer}
            type="text"
            placeholder="Answer title"
            className="border-2 border-gray-800 rounded-lg p-2 m-2 w-full"
          />
          <button
            onClick={handleNewAnswer}
            className="bg-yellow-300 p-2 rounded-lg m-2"
          >
            Add new answer
          </button>
        </>
        <>
          <ul className="border-2 border-gray-800 rounded-lg p-2 m-10">
            {newQuestion.answers.length !== 0 && (
              <h1>Mark the right answer to current question</h1>
            )}
            {newQuestion.answers.map((answer: string, index: number) => (
              <li key={index} className="text-gray-600 m-2 flex items-center">
                <input
                  value={answer}
                  type="radio"
                  name="rightAnswer"
                  id={`rightAnswer-${index}`}
                  onChange={handleRightAnswer}
                />
                <label htmlFor={`rightAnswer-${index}`} className="ml-2">
                  {answer}
                </label>
                <button
                  className="text-red-500 text-xs ml-auto"
                  onClick={() => handleDeleteAnswer(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <ul className="flex justify-center space-x-20">
            <li key="easy">
              <input
                value={"easy"}
                type="radio"
                name="difficulty"
                id={`difficulty-easy`}
                onChange={handleDifficultyLevel}
              />
              <label htmlFor={`difficulty-easy`}>easy</label>
            </li>
            <li key="middle">
              <input
                value={"middle"}
                type="radio"
                name="difficulty"
                id={`difficulty-middle`}
                onChange={handleDifficultyLevel}
              />
              <label htmlFor={`difficulty-middle`}>middle</label>
            </li>
            <li key="hard">
              <input
                value={"hard"}
                type="radio"
                name="difficulty"
                id={`difficulty-hard`}
                onChange={handleDifficultyLevel}
              />
              <label htmlFor={`difficulty-hard`}>hard</label>
            </li>
          </ul>
          <ul></ul>
        </>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="bg-yellow-300 p-2 rounded-lg m-2"
            onClick={handleAddAnotherQuestion}
          >
            Add Question
          </button>
        </div>
        <div className=" mt-10">
          <p>This is the list of your questions:</p>
          <ul>
            {editingQuiz.questions.map((question: Question, index: number) => (
              <li key={index} className="text-yellow-300 font-bold text-sm m-2">
                {question.title}
                <button
                  className="text-red-500 text-xs ml-10"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="border-yellow-300 p-2 rounded-lg m-2 w-60 text-xl text-yellow-300 mt-10"
      >
        Submit Form
      </button>
    </>
  );
};
