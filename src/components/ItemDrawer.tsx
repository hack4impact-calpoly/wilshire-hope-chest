import { Drawer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import "./ItemDrawer.css";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { DataStore } from "@aws-amplify/datastore";
import TagsList from "./TagsList";
// import { Item } from "../models";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "value", headerName: "Price", minWidth: 150 },
  { field: "dataAdded", headerName: "Date Added", minWidth: 150 },
  {
    field: "categorys",
    headerName: "Categorys",
    minWidth: 350,
    flex: 2,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <strong>
        <TagsList categories={params.value} />
      </strong>
    ),
  },
];

const testRow = {
  id: 2,
  name: "New balance sneaker",
  dataAdded: "2/23/2023",
  value: "$60",
  image: "",
  categorys: ["Alothing", "tag2", "tag3", "tag4", "tag5"],
};

function ItemDrawer() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

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
    setRows(() => []);
  }

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
          setRows(() => []);
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
                {/* <div className="plus" /> */}
                <AddIcon sx={{ color: "white", fontSize: 12 }} />
                <div className="add-text">Add Item</div>
              </div>
            </button>
          </div>
          <div className="data-table">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowHeight={() => "auto"}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]}
              sx={{
                "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                  py: "8px",
                },
                "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                  py: "15px",
                },
                "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                  py: "22px",
                },
              }}
            />
          </div>
          <div className="end-buttons">
            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                setRows(() => []);
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
