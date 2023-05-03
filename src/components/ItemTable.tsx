import "./TagStyle.css";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
// import TagsList from "./TagsList";
import { Item } from "../models";

// Sample data, should remove it after the fetch call is fixed
// REMARKS: the type of categorys here doesn't matched with the data
const rows: GridRowsProp = [
  {
    id: 1,
    name: "Air Jordan",
    dataAdded: "2/14/2023",
    value: 60,
    image: "",
    categorys: ["Clothing", "tag3", "tag4"],
  },
  {
    id: 2,
    name: "New balance sneaker",
    dataAdded: "2/23/2023",
    value: "$60",
    image: "",
    categorys: ["Alothing", "tag2", "tag3", "tag4", "tag5"],
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "value", headerName: "Price", minWidth: 150 },
  { field: "dataAdded", headerName: "Date Added", minWidth: 150 },
  // TODO: put the Categorys back once the fetch call is fixed
  /* {
    field: "categorys",
    headerName: "Categorys",
    minWidth: 350,
    flex: 2,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <strong>
        <TagsList categories={params.value} />
      </strong>
    ),
  }, */
];

export default function ItemTable() {
  // const [rows, setRows] = useState<LazyItem[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DataStore.query(Item);
        console.log(
          "Items retrieved successfully!",
          JSON.stringify(items, null, 2)
        );
        // setRows(items);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowHeight={() => "auto"}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
        sx={{
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "15px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "22px",
          },
        }}
      />
    </div>
  );
}
