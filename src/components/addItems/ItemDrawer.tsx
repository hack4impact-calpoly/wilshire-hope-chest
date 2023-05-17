import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "@mui/material";
import { GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import "../../styles/ItemDrawer.css";
import Table from "../tables/Table";

const testRow = {
  id: 2324,
  name: "New balance sneaker",
  dateAdded: "01 Jan 1970 00:00:00 GMT",
  value: 60,
  cats: ["Alothing", "tag2", "tag3", "tag4", "tag5"],
};

function ItemDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    if (rows.length === 0) {
      setIsDisabled(true);
    } else if (rows.length > 0) {
      setIsDisabled(false);
    }
  }, [rows]);

  async function sendData() {
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await DataStore.save(rows[i]);
        console.log("Item sent successfully!");
      } catch (error) {
        console.log("Error sending row", error);
      }
    }
    setRows([]);
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // This function will only be called when user click edit and save button
  // The newRow is the updated row, and the table will display the updated row
  // TODO: modify this function to update the rows with the newRow
  // suggestion: find the old row by id and update the field
  const handleRowEditCommit = (newRow: GridRowModel) => {
    let categories = newRow.cats;
    if (typeof categories === "string") {
      categories = categories.replace(/\s/g, "").split(",").sort();
    }
    // reformat the newRow to match the type of each column
    const rowFormatter = {
      ...newRow,
      value: parseFloat(newRow.value),
      cats: categories,
    };
    return rowFormatter;
  };

  return (
    <>
      <button
        className="add-button2"
        type="button"
        onClick={() => setIsDrawerOpen(true)}
      >
        <div className="button-layout2">
          {/* <div className="plus" /> */}
          <AddIcon sx={{ color: "white", fontSize: 12 }} />
          <div className="add-text2">Add Items</div>
        </div>
      </button>
      <Drawer
        anchor="bottom"
        hideBackdrop
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setRows([]);
        }}
      >
        <div>
          <button
            className="back-button"
            type="button"
            onClick={() => {
              setIsDrawerOpen(false);
              setRows(() => []);
            }}
            aria-label="back"
          />
          <div className="summary-row">
            <div className="summary-text">
              Donation Summary: {rows.length} Items
            </div>
            <button
              className="add-button"
              type="button"
              onClick={() => setRows([...rows, testRow])}
              // need to change this to get new item from Add Item modal
            >
              <div className="button-layout">
                <AddIcon sx={{ color: "white", fontSize: 12 }} />
                <div className="add-text">Add Item</div>
              </div>
            </button>
          </div>
          <div className="data-table">
            <Table
              tableHeight="54vh"
              rows={rows}
              handleDeleteClick={handleDeleteClick}
              handleRowEditCommit={handleRowEditCommit}
            />
          </div>
          <div className="end-buttons">
            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                setRows([]);
              }}
            >
              Cancel
            </button>
            <button
              className="send-button"
              type="button"
              disabled={isDisabled}
              onClick={() => {
                console.log("sent receipt");
                sendData();
                setIsDrawerOpen(false);
              }}
            >
              Send Receipt
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ItemDrawer;
