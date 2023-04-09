// import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import "./App.css";
import awsconfig from "./aws-exports";
import DropdownFiltersCombined from "./components/Dropdown/DropdownFiltersCombined";
// import configuraiton of AWS authentication
Auth.configure(awsconfig);

function App() {
  return (
    <DropdownFiltersCombined />

    // <Authenticator>
    //   {({ signOut, user }: any) => (
    //     <div>
    //       <p>Welcome to wilshire, {user.username}</p>
    //       <button type="button" onClick={signOut}>
    //         Sign out
    //       </button>
    //     </div>
    //   )}
    // </Authenticator>
  );
}

export default App;
