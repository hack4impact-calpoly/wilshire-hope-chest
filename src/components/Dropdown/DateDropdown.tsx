import "./DropdownStyles.css";
import { BiPlus } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useState } from "react";

export default function Styledropdown() {
  const [icon, setIcon] = useState(<BiPlus size={18} />);
  function Showhide() {
    const click = document.getElementById("DateDropdown");
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
        <span className="C1"> Date </span>
      </button>
      <div id="DateDropdown" className="dropdown-content-two-items">
        <div className="font">
          <ul>
            <li>
              <span className="items">
                Newest
                <input
                  type="radio"
                  name="date"
                  value="value"
                  className="Newest"
                />
              </span>
            </li>
            <li>
              <span className="items">
                Oldest
                <input
                  type="radio"
                  name="date"
                  value="value"
                  className="Oldest"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
