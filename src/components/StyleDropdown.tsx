import "./DropdownStyles.css";
import { BiPlus } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useState } from "react";

export default function Styledropdown() {
  const [icon, setIcon] = useState(<BiPlus size={18} />);
  function Showhide() {
    const click = document.getElementById("myDropdown");
    if (click?.style.display === "none") {
      click.style.display = "block";
      setIcon(<IoCheckmarkSharp size={18} />);
    } else {
      click!.style.display = "none";
      setIcon(<BiPlus size={18} />);
    }
  }
  return (
    <div className="dropdown">
      <button type="button" onClick={Showhide} className="dropbtn">
        <span id="Change"> {icon} </span>
        <span className="C1"> Style </span>
      </button>
      <div id="myDropdown" className="dropdown-content">
        <div className="font">
          <ul>
            <li>
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
