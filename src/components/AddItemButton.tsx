import { DataStore } from "aws-amplify";
import { Category, Item, ItemCategory } from "../models";

function AddItemButton() {
  // Sample data for testing
  const items = [
    {
      name: "white desk",
      dateAdded: "2023-04-16",
      value: 30.0,
      categories: ["Furniture"],
    },
    {
      name: "leather cardholder",
      dateAdded: "2023-04-16",
      value: 5.0,
      categories: ["Misc"],
    },
  ];

  async function handleClick() {
    // Handle a request to add a list of items
    await Promise.all(
      items.map(async (item) => {
        // To get the detail of the chosen categories
        const categories = await Promise.all(
          item.categories.map(async (name) => {
            const category = await DataStore.query(Category, (c) =>
              c.name.eq(name)
            );
            console.log("category = ", category[0]);
            // If datastore cannot find the category, it only return undefine, won't throw error
            if (category[0] === undefined) {
              console.log("Error! Undefined category");
            }
            return category[0];
          })
        );

        // Create the item and save it to DataStore first
        const newItem = new Item({
          name: item.name,
          dateAdded: item.dateAdded,
          value: item.value,
        });
        try {
          await DataStore.save(newItem);
          console.log("Added a item = ", newItem);
        } catch (error) {
          console.log("Error adding an item", error);
        }

        // Add the ItemCategory one by one
        try {
          await Promise.all(
            categories.map(async (category) => {
              const categoryItem = new ItemCategory({
                item: newItem,
                category,
              });
              await DataStore.save(categoryItem);
              console.log("Added a categoryItem = ", categoryItem);
            })
          );
        } catch (error) {
          console.log("Error adding a categoryItem", error);
        }
      })
    );
  }

  const handleEmailSubmit = () => {
    // e.preventDefault();
    fetch("https://xgjrtv69b5.execute-api.us-west-2.amazonaws.com/sendEmail", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderName: "wilshire-health",
        senderEmail: "lukeforadream@gmail.com",
        message: "HI HERE IS YOUR DONATION LIST...",
        date: new Date(),
      }),
    });
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Submit item
      </button>

      <button type="button" onClick={handleEmailSubmit}>
        Send email
      </button>
    </div>
  );
}

export default AddItemButton;
