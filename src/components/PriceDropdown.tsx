import "./DropdownStyles.css";
import { BiPlus } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useState } from "react";

export default function Styledropdown() {
  const [icon, setIcon] = useState(<BiPlus size={18} />);
  function Showhide() {
    const click = document.getElementById("PriceDropdown");
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
        <span className="C1"> Price </span>
      </button>
      <div id="PriceDropdown" className="dropdown-content-two-items">
        <div className="font">
          <ul>
            <li>
              <span className="items">
                Low to High
                <input
                  type="radio"
                  name="price"
                  value="value"
                  className="lowToHigh"
                />
              </span>
            </li>
            <li>
              <span className="items">
                High to Low
                <input
                  type="radio"
                  name="price"
                  value="value"
                  className="highToLow"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
