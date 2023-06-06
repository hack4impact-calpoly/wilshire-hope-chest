/* eslint-disable */
import { Amplify, AuthModeStrategyType } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import awsconfig from "./aws-exports";
import "./index.css";

// configure Amplify and user group authentication
Amplify.configure({
  ...awsconfig,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
