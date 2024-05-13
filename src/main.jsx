import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
<<<<<<< HEAD
import { main_theme } from "../palette-theme-colors.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
=======
import App from "./App.jsx";
import { main_theme } from "../palette-theme-colors.js";
import { BrowserRouter } from "react-router-dom";
>>>>>>> login
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={main_theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
=======
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={main_theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
>>>>>>> login
);
