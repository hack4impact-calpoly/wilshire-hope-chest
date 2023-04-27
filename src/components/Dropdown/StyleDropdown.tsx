import "./DropdownStyles.css";
import { BiPlus } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";

import { Category } from "../../models";

export default function Styledropdown() {
  const [icon, setIcon] = useState(<BiPlus size={18} />);
  const [categories, setCategories] = useState<Category[]>([]);
  const seed = [
    { name: "test_category_1", description: "first testing category" },
    { name: "test_category_2", description: "second testing category" },
    { name: "test_category_3", description: "thrid testing category" },
  ];

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await DataStore.query(Category);
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  console.log(categories);

  function Showhide() {
    const click = document.getElementById("StyleDropdown");
    if (click?.style.display === "none") {
      click.style.display = "block";
      setIcon(<IoCheckmarkSharp size={18} />);
    } else {
      click!.style.display = "none";
      setIcon(<BiPlus size={18} />);
    }
  }

  // this functin can be removed any timee, just for testing purposes
  const handleSeed = async () => {
    seed.forEach(async (el) => {
      await DataStore.save(
        new Category({
          ...el,
        })
      );
    });
  };

  // this functin can be removed any timee, just for testing purposes
  const handleDeleteSeed = async () => {
    await DataStore.delete(Category, (category) =>
      category.name.contains("test")
    ); // delete all the posts
  };
  return (
    <div className="dropdown">
      {/* div and two buttons two buttons can be removed at any time, just for testing purposes */}
      <div style={{ margin: "5px" }}>
        <button
          type="button"
          style={{ marginRight: "10px" }}
          className="test"
          onClick={handleSeed}
        >
          Seed
        </button>
        <button type="button" className="test" onClick={handleDeleteSeed}>
          Delete Seed
        </button>
      </div>

      <button type="button" onClick={Showhide} className="dropbtn">
        <span id="Change"> {icon} </span>
        <span className="C1"> Style </span>
      </button>

      <div id="StyleDropdown" className="dropdown-content-three-items">
        <div className="font">
          <ul>
            {/* <li>
              <span className="items">
                Clothes
                <input
                  type="checkbox"
                  name="checkbox"
                  value="value"
                  className="clothes"
                />
              </span>
            </li>
            <li>
              <span className="items">
                Jewelry
                <input
                  type="checkbox"
                  name="checkbox"
                  value="value"
                  className="jewelry"
                />
              </span>
            </li>
            <li>
              <span className="items">
                Shoes
                <input
                  type="checkbox"
                  name="checkbox"
                  value="value"
                  className="shoes"
                />
              </span>
            </li> */}
            {categories.map((category) => (
              <li key={category.id}>
                <span className="items">{category.name}</span>
                <input
                  type="checkbox"
                  name="checkbox"
                  value="value"
                  className={category.name?.toLowerCase()}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
