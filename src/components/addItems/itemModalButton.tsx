import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
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

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#006d7d",
          width: "fit-content",
          height: 40,
          borderRadius: 100,
          alignSelf: "end",
        }}
      >
        Add Item
      </Button>
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
