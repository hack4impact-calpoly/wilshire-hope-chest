import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import "./App.css";
import awsconfig from "./aws-exports";
import Home from "./components/Home";

// import configuration of AWS authentication
Auth.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      <Home />
    </Authenticator>
  );
}

export default App;
