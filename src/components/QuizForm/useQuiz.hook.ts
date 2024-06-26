import { useContext, useEffect, useId, useState } from "react";

import { getCurrentQuiz } from "../../helpers/getCurrentQuestionAndQuiz";

import type { Quiz } from "../../types";
import { QuizContext } from "../../store/QuizContext/QuizContext";

export const useQuiz = () => {
  const quizId = useId();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const {
    state: {
      quizes,
      editingQuizId,
      isQuizEditing,
      isAddingNewQuiz,
      newQuizTitle,
    },
  } = useContext(QuizContext);
  const targetQuiz = getCurrentQuiz(quizes, editingQuizId);

  useEffect(() => {
    if (isQuizEditing) {
      setQuiz({ ...targetQuiz });
    } else if (isAddingNewQuiz) {
      setQuiz({
        id: quizId,
        title: newQuizTitle,
        questions: [],
      });
    }
  }, [isQuizEditing, isAddingNewQuiz, newQuizTitle, quizId, targetQuiz]);

  const handleDeleteQuestion = (index: number) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz!,
      questions: prevQuiz!.questions.filter(
        (_, questionIndex) => questionIndex !== index
      ),
    }));
  };

  return {
    quiz,
    setQuiz,
    handleDeleteQuestion,
  };
};