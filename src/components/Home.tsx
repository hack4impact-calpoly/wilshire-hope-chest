import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import ItemDrawer from "./addItems/ItemDrawer";
import ItemTable from "./tables/ItemTable";

function Home() {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (
        user.signInUserSession.accessToken.payload["cognito:groups"]?.includes(
          "verified"
        )
      ) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    };
    checkUser();
  }, []);

  const signOut = async () => {
    await Auth.signOut();
  };

  if (verified === null) return <h3>Loading...</h3>;

  return verified ? (
    <>
      <Header />
      <div className="main-content">
        <ItemDrawer />
        <ItemTable />
      </div>
    </>
  ) : (
    <>
      <h1>Account not verified</h1>
      <Button variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}

export default Home;
