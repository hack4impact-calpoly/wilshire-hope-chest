import "./App.css";
import ItemCard from "./components/ItemCard";
import TagsList from "./components/TagsList";

function App() {
  return (
    <div>
      <TagsList categories={["tag1", "tag2", "tag3"]} />
      <ItemCard
        itemName="name"
        date={new Date()}
        money={5.6}
        tags={["tag1", "tag2", "tag3"]}
      />
      <ItemCard
        itemName="name"
        date={new Date()}
        money={5.6}
        tags={["tag1", "tag2", "tag3"]}
      />
      <ItemCard
        itemName="name"
        date={new Date()}
        money={5.6}
        tags={["tag1", "tag2", "tag3"]}
      />
    </div>
  );
}

export default App;
