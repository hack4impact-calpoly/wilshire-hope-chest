import React from "react";
import "./App.css";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
// import configuraiton of AWS authentication
Auth.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }: any) => (
        <div>
          <p>Welcome to wilshire, {user.username}</p>
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
