/* eslint-disable */
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import config from "./aws-exports";
import "./index.css";

Amplify.configure(config);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
