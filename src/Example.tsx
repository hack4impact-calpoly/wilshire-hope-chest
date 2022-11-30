import { useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Example } from "./models";

function DataTest() {
  useEffect(() => {
    DataStore.query(Example).then((models: any) => console.log(models));
  }, []);

  async function handleClick() {
    await DataStore.save(
      new Example({
        name: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet",
      })
    );
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click here
      </button>
    </div>
  );
}

export default DataTest;
