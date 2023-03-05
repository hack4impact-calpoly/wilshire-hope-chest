import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

// Configure Amplify in index file or root file
// aws-export.js needs refactoring
// what properties should be used in the authenticaiton object, needs a clarificaiton
Amplify.configure({
  Auth: {
    region: awsExports.aws_project_region,
  },
});

function App() {
  return (
    <Authenticator>
      {({ signOut, user }: any) => (
        <div>
          <p>Welcome {user.username}</p>
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
