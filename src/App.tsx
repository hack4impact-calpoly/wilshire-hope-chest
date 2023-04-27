import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth, Amplify } from "aws-amplify";
import "./App.css";
import ItemTable from "./components/ItemTable";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
// import configuraiton of AWS authentication
Auth.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }: any) => (
        <div>
          <p>Welcome to wilshire, {user.username}</p>
          <ItemTable />
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
