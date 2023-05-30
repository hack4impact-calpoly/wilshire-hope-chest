import { Button } from "@mui/material";
import { GridRowsProp } from "@mui/x-data-grid";
import { DataStore } from "aws-amplify";
import emailjs from "emailjs-com";
import { useEffect } from "react";
import { Category, Item, ItemCategory } from "../../models";
import "../../styles/AddItemButton.css";

type AddItemButtonProps = {
  isDisabled: boolean;
  rows: GridRowsProp;
  handleClose: () => void;
  email: string | undefined;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function AddItemButton({
  isDisabled,
  rows,
  handleClose,
  email,
  setEmailValid,
}: AddItemButtonProps) {
  useEffect(() => {
    if (email === undefined) return;
    if (email.length === 0 || !email.match(validRegex)) {
      setEmailValid(false);
    } else if (email.match(validRegex)) {
      setEmailValid(true);
    }
  }, [email]);

  // helper function to create form inputs
  const createInput = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  };

  const handleEmailSubmit = () => {
    // generate the report based on test items (items should be replaced with real data)
    const itemCount = rows.length;
    const totalValue = rows.reduce((total, item) => total + item.value, 0);
    const itemRows = rows.map(
      (item, index) =>
        `${index + 1}. Name: ${item.name}, Value: $${item.value.toFixed(2)}`
    );

    const message = `Items Donated: ${itemCount}\n\n${itemRows.join(
      "\n"
    )}\n\nTotal Value: $${totalValue.toFixed(2)}`;

    // add the email and message fields to the form
    const form = document.createElement("form");
    form.appendChild(createInput("email", email || ""));
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

  const handleClick = async () => {
    // Handle a request to add a list of items
    await Promise.all(
      rows.map(async (item) => {
        // To get the detail of the chosen categories
        const categories = await Promise.all(
          item.cats.map(async (name: string) => {
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
          dateAdded: item.dateAdded.format("YYYY-MM-DD").toString(),
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
    handleClose();
  };

  return (
    <div className="inputs-box">
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleClick}
        sx={{
          width: 166,
          height: 53,
          borderRadius: 100,
          background: "#006d7d",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 22,
          color: "#ffffff",
        }}
      >
        Submit Items
      </Button>
    </div>
  );
}

export default AddItemButton;
