import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import "./App.css";
import Report from "./components/Report";
import awsconfig from "./aws-exports";
// import configuration of AWS authentication
Auth.configure(awsconfig);

function App() {
  return <Report />;
}

export default App;
