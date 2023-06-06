import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <Authenticator>
      <Home />
    </Authenticator>
  );
}

export default App;
