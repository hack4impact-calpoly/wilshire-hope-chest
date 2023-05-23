import "../styles/Home.css";
import Header from "./Header";
import ItemDrawer from "./addItems/ItemDrawer";
import ItemTable from "./tables/ItemTable";

function Home() {
  return (
    <>
      <Header />
      <div className="main-content">
        <ItemDrawer />
        <ItemTable />
      </div>
    </>
  );
}

export default Home;
