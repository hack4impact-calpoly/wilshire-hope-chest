import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

// Amplify.configure(awsExports);

Amplify.configure({
  Auth: {
    region: awsExports.aws_project_region,
    userPoolId: awsExports.aws_user_pools_id,
    userPoolWebClientId: awsExports.aws_user_pools_web_client_id,
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
