import React from "react";
import { BiPlus } from "react-icons/bi";
import "../../styles/ItemModal.css";
import { GridRowsProp } from "@mui/x-data-grid";
import ItemModalBackground from "./ItemModalBackground";

export default function ItemModalButton({
  rows,
  setRows,
}: {
  rows: GridRowsProp;
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
}) {
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
      {open && (
        <ItemModalBackground
          setOpenModal={handleClose}
          rows={rows}
          setRows={setRows}
        />
      )}
    </div>
  );
}
