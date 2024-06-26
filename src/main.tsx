import React from "react";
import ReactDOM from "react-dom/client";
// Good practice is to separate 3rd party packages, local imports and styles with an empty row
import App from "./App.tsx";
import { QuizProvider } from "./store/QuizContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
