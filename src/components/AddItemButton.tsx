import { DataStore } from "@aws-amplify/datastore";
import { Category, CategoryItem, Item } from "../models";

function AddItemButton() {
  async function handleClick() {
    // To get the detail of the chosen categories
    const tagsList = ["Electronics", "Furniture"];
    const categories = await Promise.all(
      tagsList.map(async (name) => {
        const category = await DataStore.query(Category, (c) =>
          c.name.eq(name)
        );
        console.log("category = ", category[0]);
        return category[0];
      })
    );

    // Create the item and save it to DataStore first
    const item = new Item({
      name: "Smart TV",
      dateAdded: "2023-04-06",
      value: 120.0,
    });
    try {
      await DataStore.save(item);
    } catch (error) {
      console.log("Error adding an item", error);
    }

    // Add the CategoryItem one by one
    try {
      await Promise.all(
        categories.map(async (category) => {
          const categoryItem = new CategoryItem({
            item,
            category,
          });
          await DataStore.save(categoryItem);
          console.log("Added a categoryItem = ", categoryItem);
        })
      );
    } catch (error) {
      console.log("Error adding a categoryItem", error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Submit item
      </button>
    </div>
  );
}

export default AddItemButton;
