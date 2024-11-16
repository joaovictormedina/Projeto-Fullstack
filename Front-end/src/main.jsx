import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/Styles.css";
import "./styles/Footer.css";
import "./styles/Home.css";
import App from "./App.jsx";
// src/main.js


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
