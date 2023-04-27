import { Authenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import "../App.css";
import "./Home.css";
import awsconfig from "../aws-exports";
import Header from "./Header";
// import configuraiton of AWS authentication
Auth.configure(awsconfig);

// type AppProps = {
//   signOut?: ((data?: AuthEventData | undefined) => void) | undefined;
//   user: AmplifyUser | undefined;

// }

function Home() {
  return (
    <>
      <Header />
      <Authenticator className="authenticator">
        {({ signOut, user }) => (
          <div>
            <p>Welcome to wilshire, {user?.username}</p>
            {signOut && (
              <button type="button" onClick={signOut}>
                Sign out
              </button>
            )}
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default Home;
