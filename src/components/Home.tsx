import { Auth } from "aws-amplify";
import "../styles/Home.css";
import Header from "./Header";
import ItemDrawer from "./addItems/ItemDrawer";
import EditCategoriesModal from "./categories/EditCategoriesModal";
import ItemTable from "./tables/ItemTable";

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
        <EditCategoriesModal />
      </div>
    </>
  );
}

export default Home;
