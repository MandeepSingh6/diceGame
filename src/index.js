import "./index.css";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./app.js"

const root = createRoot(document.querySelector("#root"));
root.render(<App />)