import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./providers/MovieProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MovieProvider>
  </StrictMode>
);
