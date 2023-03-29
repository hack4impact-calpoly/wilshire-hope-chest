import "./DropdownStyles.css";
import Styledropdown from "./StyleDropdown";
import Pricedropdown from "./PriceDropdown";
import Datedropdown from "./DateDropdown";

export default function DropdownFiltersCombined() {
  return (
    <div className="flexbox-container">
      <span className="dropdown"> Sort by: </span>
      <div>
        <Styledropdown />
      </div>
      <div>
        <Pricedropdown />
      </div>
      <div>
        <Datedropdown />
      </div>
    </div>
  );
}
