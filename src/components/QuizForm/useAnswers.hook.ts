import { useCallback, useState } from "react";

import type { Question } from "../../types";

type UseAnswersProps = {
  newQuestion: Question;
  setNewQuestion: React.Dispatch<React.SetStateAction<Question>>;
};

export const useAnswers = ({
  newQuestion,
  setNewQuestion,
}: UseAnswersProps) => {
  const [newAnswer, setNewAnswer] = useState("");

  const handleNewAnswer = useCallback(() => {
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
  }, [newAnswer, newQuestion, setNewQuestion]);

  return {
    newAnswer,
    handleNewAnswer,
    setNewAnswer,
  };
};