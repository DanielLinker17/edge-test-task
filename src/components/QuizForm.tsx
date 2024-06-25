import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../store/QuizContext";
import { Question, Quiz } from "../types/types";
import { getCurrentQuiz } from "../helpers/getCurrentQuestionAndQuiz";
import { createUniqueId } from "../helpers/createUniqueId";

export const QuizForm: React.FC = () => {
  const { dispatch, state } = useContext(QuizContext);
  const { quizes, editingQuizId, isQuizEditing, isAddingNewQuiz, newQuizTitle } = state;
  
  const targetQuiz = getCurrentQuiz(quizes, editingQuizId);
  
  const [newAnswer, setNewAnswer] = useState("");
  const [newQuestion, setNewQuestion] = useState<Question>({
    title: "",
    answers: [],
    rightAnswer: "",
    difficulty: "",
  });
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (isQuizEditing) {
      setQuiz({ ...targetQuiz });
    } else if (isAddingNewQuiz) {
      setQuiz({
        id: createUniqueId(),
        title: newQuizTitle,
        questions: [],
      });
    }
  }, [isQuizEditing, isAddingNewQuiz, targetQuiz, newQuizTitle]);

  const handleQuestionTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, title: e.target.value });
  };

  const handleNewAnswer = () => {
    if (newAnswer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }

    if (newQuestion.answers.includes(newAnswer)) {
      alert("This answer already exists");
      return;
    }

    setNewQuestion({
      ...newQuestion,
      answers: [...newQuestion.answers, newAnswer],
    });
    setNewAnswer("");
  };

  const handleDeleteAnswer = (index: number) => {
    const newAnswers = newQuestion.answers.filter((_, answerIndex) => answerIndex !== index);
    setNewQuestion({ ...newQuestion, answers: newAnswers });
  };

  const handleDifficultyLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, difficulty: e.target.value });
  };

  const handleGoBack = () => {
    dispatch({ type: "GO_BACK" });
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

    setQuiz((prevQuiz) => ({
      ...prevQuiz!,
      questions: [...prevQuiz!.questions, { ...newQuestion }],
    }));

    setNewQuestion({
      title: "",
      answers: [],
      rightAnswer: "",
      difficulty: "",
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz!,
      questions: prevQuiz!.questions.filter((_, questionIndex) => questionIndex !== index),
    }));
  };

  const handleRightAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, rightAnswer: e.target.value });
  };

  const handleSubmit = () => {
    if (quiz!.questions.length === 0) {
      alert("Please add some questions to your quiz");
      return;
    }

    if (isQuizEditing) {
      dispatch({ type: "STOP_EDIT_QUIZ", payload: quiz! });
    } else if (isAddingNewQuiz) {
      dispatch({ type: "ADD_QUIZ", payload: quiz! });
    }
  };

  return (
    <div className="border-2 border-yellow-300 rounded-xl p-10 space-y-10">
      <div className="flex items-center">
        <h1 className="text-yellow-300 text-2xl font-bold">
          Your quiz name: {quiz?.title}
        </h1>
        <button
          onClick={handleGoBack}
          type="submit"
          className="border-gray-500 p-1 rounded-lg ml-auto text-l hover:bg-red-700 hover:text-gray-300"
        >
          Go Back
        </button>
      </div>
      <h2 className="text-xl font-bold text-gray-300">Add a new question</h2>
      <input
        onChange={handleQuestionTitle}
        value={newQuestion.title}
        type="text"
        placeholder="Question title"
        className="border-2 border-gray-800 rounded-lg p-2 m-2 w-full"
      />
      <h2 className="text-xl font-bold text-gray-300 mt-2">Add answers</h2>
      <div className="flex items-center">
        <input
          onChange={(e) => setNewAnswer(e.target.value)}
          value={newAnswer}
          type="text"
          placeholder="Answer title"
          className="border-2 border-gray-800 rounded-lg p-2 m-2 w-full"
        />
        <button
          onClick={handleNewAnswer}
          className="border-yellow-300 p-2 rounded-lg text-yellow-300 hover:bg-yellow-300 hover:text-gray-800"
        >
          ✓
        </button>
      </div>
      {newQuestion.answers.length !== 0 && (
        <div className="border-2 border-gray-800 rounded-lg p-2 shadow-md space-y-5">
          {newQuestion.answers.length !== 0 && <p>Mark the right answer to current question</p>}
          <ul style={{ maxHeight: "150px", overflow: "auto" }}>
            {newQuestion.answers.map((answer, index) => (
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
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-300">Choose difficulty level</h2>
      <ul className="flex justify-center space-x-10">
        <li key="easy">
          <input
            checked={newQuestion.difficulty === "easy"}
            value={"easy"}
            type="radio"
            name="difficulty"
            id={`difficulty-easy`}
            onChange={handleDifficultyLevel}
          />
          <label className="ml-1" htmlFor={`difficulty-easy`}>
            Easy (10 points)
          </label>
        </li>
        <li key="middle">
          <input
            checked={newQuestion.difficulty === "middle"}
            value={"middle"}
            type="radio"
            name="difficulty"
            id={`difficulty-middle`}
            onChange={handleDifficultyLevel}
          />
          <label className="ml-1" htmlFor={`difficulty-middle`}>
            Middle (20 points)
          </label>
        </li>
        <li key="hard">
          <input
            checked={newQuestion.difficulty === "hard"}
            value={"hard"}
            type="radio"
            name="difficulty"
            id={`difficulty-hard`}
            onChange={handleDifficultyLevel}
          />
          <label className="ml-1" htmlFor={`difficulty-hard`}>
            Hard (30 points)
          </label>
        </li>
      </ul>
      <button
        type="button"
        className="border-yellow-300 border-2 p-2 rounded-lg text-yellow-300 hover:bg-yellow-300 hover:text-gray-800"
        onClick={handleAddAnotherQuestion}
      >
        Add Question
      </button>
      <ul
        style={{ maxHeight: "150px", overflow: "auto" }}
        className="border-2 border-gray-800 rounded-lg p-2 shadow-sm shadow-white max-h-200 overflow-y-auto space-y-2"
      >
        <h3 className="text-gray-300 font-bold">
          {quiz?.questions.length === 0
            ? "No questions added yet"
            : "This is the list of your questions:"}
        </h3>
        {quiz?.questions.map((question, index) => (
          <li key={index} className="text-yellow-300 flex items-center font-bold text-sm">
            <p>{question.title}</p>
            <button
              onClick={() => handleDeleteQuestion(index)}
              className="text-red-500 text-xs ml-auto"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      {quiz?.questions.length !== 0 && (
        <button
          onClick={handleSubmit}
          type="submit"
          className="border-yellow-300 p-2 rounded-lg w-60 text-yellow-300 hover:bg-yellow-300 hover:text-gray-800"
        >
          {isQuizEditing ? "Save Changes" : "Add Quiz"}
        </button>
      )}
    </div>
  );
};
