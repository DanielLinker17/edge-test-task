import { Question } from "../../types";

export const initialQuestions: Question[] = [
  {
    title: "What is React?",
    rightAnswer: "B) A JavaScript library for building user interfaces",
    answers: [
      "A) A programming language",
      "B) A JavaScript library for building user interfaces",
      "C) A database management system",
      "D) An operating system",
    ],
    difficulty: "easy",
  },
  {
    title: "Which of the following is NOT a core feature of React?",
    rightAnswer: "C) Two-way data binding",
    answers: [
      "A) Virtual DOM",
      "B) JSX syntax",
      "C) Two-way data binding",
      "D) Component-based architecture",
    ],
    difficulty: "easy",
  },
  {
    title: "What does JSX stand for in React?",
    rightAnswer: "A) JavaScript XML",
    answers: [
      "A) JavaScript XML",
      "B) JavaScript Xtreme Syntax",
      "C) JavaScript Execution",
      "D) JavaScript Xtra",
    ],
    difficulty: "easy",
  },
  {
    title: "What is the purpose of state in React?",
    rightAnswer: "A) To store data that may change over time",
    answers: [
      "A) To store data that may change over time",
      "B) To define static variables",
      "C) To manage server-side requests",
      "D) To control the layout of components",
    ],
    difficulty: "easy",
  },
  {
    title:
      "What lifecycle method is invoked immediately after a component is inserted into the DOM in React?",
    rightAnswer: "A) componentDidMount",
    answers: [
      "A) componentDidMount",
      "B) componentDidUpdate",
      "C) componentWillUnmount",
      "D) render",
    ],
    difficulty: "easy",
  },
  {
    title: "What is the function of the setState method in React?",
    rightAnswer: "A) To modify the state of a component",
    answers: [
      "A) To modify the state of a component",
      "B) To define the initial state of a component",
      "C) To render a component",
      "D) To import external libraries",
    ],
    difficulty: "easy",
  },
  {
    title: "What tool can you use for debugging React applications?",
    rightAnswer: "A) React Developer Tools",
    answers: [
      "A) React Developer Tools",
      "B) Chrome Developer Tools",
      "C) Visual Studio Code",
      "D) Sublime Text",
    ],
    difficulty: "easy",
  },
  {
    title: "What is a React component?",
    rightAnswer: "A) A function or class that returns HTML elements",
    answers: [
      "A) A function or class that returns HTML elements",
      "B) A server-side database",
      "C) A JavaScript module",
      "D) A CSS stylesheet",
    ],
    difficulty: "easy",
  },
  {
    title:
      "How can you pass data from a parent component to a child component in React?",
    rightAnswer: "A) Using props",
    answers: [
      "A) Using props",
      "B) Using state",
      "C) Using context",
      "D) Using refs",
    ],
    difficulty: "easy",
  },
  {
    title:
      "What feature of React allows you to reuse code and isolate components?",
    rightAnswer: "A) Components",
    answers: ["A) Components", "B) Props", "C) State", "D) Hooks"],
    difficulty: "easy",
  },
];
