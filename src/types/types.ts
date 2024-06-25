export type Question = {
  title: string;
  rightAnswer: string;
  answers: string[];
  difficulty: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export type Action =
  | { type: "START_ADDING_NEW_QUIZ"; payload: string}
  | { type: "GO_BACK"}
  | { type: "START_EDITING_QUIZ"; payload: string}
  | { type: "START_QUIZ"; payload: string }
  | { type: "NEXT_QUESTION"; payload: string }
  | { type: "ADD_QUIZ"; payload: Quiz }
  | { type: "DELETE_QUIZ"; payload: string }
  | { type: "START_EDIT_QUIZ"; payload: string }
  | { type: "STOP_EDIT_QUIZ"; payload: Quiz }
  | { type: "RESET_QUIZ" }
  | { type: "HANDLE_TIMER" };

export type State = {
  quizes: Quiz[];
  newQuizTitle: string;
  isQuizEditing: boolean,
  editingQuizId: string,
  isAddingNewQuiz: boolean;
  isQuizStarted: boolean;
  currentQuizId: string;
  quizFinished: boolean;
  userAnswers: string[];
  currentQuestionIndex: number;
  secondsRemining: number;
};

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type QuizProviderProps = {
  children: React.ReactNode;
};

export type QuizListProps = {
  quiz: Quiz;
};