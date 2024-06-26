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
