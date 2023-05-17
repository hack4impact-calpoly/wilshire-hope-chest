import React from "react";
import { BiPlus } from "react-icons/bi";
import "../styles/ItemModal.css";
import ItemModalBackground from "./ItemModalBackground";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const icon = <BiPlus size={18} />;

  return (
    <div>
      <button type="button" onClick={handleOpen} className="dropbtn">
        <span id="Change"> {icon} </span>
        Add Item
      </button>
      {open && <ItemModalBackground setOpenModal={handleClose} />}
    </div>
  );
}
