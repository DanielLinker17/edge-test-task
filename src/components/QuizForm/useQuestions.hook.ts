import React, { useCallback, useState } from "react";

import type { Question, Quiz } from "../../types";

type UseQuestionsProps = {
  setQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
};

export const useQuestions = ({ setQuiz }: UseQuestionsProps) => {
  const [newQuestion, setNewQuestion] = useState<Question>({
    title: "",
    answers: [],
    rightAnswer: "",
    difficulty: "",
  });

  const handleQuestionTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewQuestion({ ...newQuestion, title: e.target.value });
    },
    [newQuestion]
  );

  const handleDeleteAnswer = useCallback(
    (index: number) => {
      const newAnswers = newQuestion.answers.filter(
        (_, answerIndex) => answerIndex !== index
      );
      setNewQuestion({ ...newQuestion, answers: newAnswers });
    },
    [newQuestion]
  );

  const handleDifficultyLevel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewQuestion({ ...newQuestion, difficulty: e.target.value });
    },
    [newQuestion]
  );

  const handleAddAnotherQuestion = useCallback(() => {
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
  }, [newQuestion, setQuiz]);

  const handleRightAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, rightAnswer: e.target.value });
  };

  return {
    newQuestion,
    handleQuestionTitle,
    handleDeleteAnswer,
    handleDifficultyLevel,
    handleAddAnotherQuestion,
    handleRightAnswer,
    setNewQuestion,
  };
};