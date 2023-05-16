import { Auth } from "aws-amplify";
import "../App.css";
import Header from "./Header";
import "./Home.css";
import ItemTable from "./ItemTable";
import ItemDrawer from "./ItemDrawer";

function Home() {
  async function signOut() {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      <Header />
      <div className="signout">
        <button type="button" onClick={signOut}>
          Sign out
        </button>
        <ItemTable />
        <ItemDrawer />
      </div>
    </>
  );
}

export default Home;
