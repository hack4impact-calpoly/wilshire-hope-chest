import { useState } from "react";
import { DataStore } from "aws-amplify";
import emailjs from "emailjs-com";
import { Category, Item, ItemCategory } from "../../models";
import "../../styles/AddItemButton.css";

function AddItemButton() {
  const [email, setEmail] = useState("");
  const [message] = useState("Here's a list...");
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // helper function to create form inputs
  const createInput = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  };

  const handleEmailSubmit = () => {
    const form = document.createElement("form");

    // add the email and message fields to the form
    form.appendChild(createInput("email", email));
    form.appendChild(createInput("message", message));

    // need to move all the id info to .env
    emailjs
      .sendForm(
        "service_tc4tbeh",
        "template_30lkbx1",
        form,
        "kGHTJu039TVZoCWxs"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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

    handleEmailSubmit();
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Submit item
      </button>
      <div className="email-field">
        {/* <label htmlFor="email">Email:</label> */}
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Please enter your email"
        />
      </div>
      <button name="submit" type="button" onClick={handleEmailSubmit}>
        Send Email Test
      </button>
    </div>
  );
}

export default AddItemButton;
