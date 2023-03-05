import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

type AppProps = {
  signOut: () => void;
  user: User;
};

interface User {
  username?: string;
}

function App({ signOut, user }: AppProps) {
  return (
    <>
      <p>Wilshire Hospice App</p>
      <h1>Hello {user.username}</h1>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </>
  );
}

export default withAuthenticator(App);
