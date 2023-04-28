import "./TagStyle.css";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import { Item, LazyItem } from "../models";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "price", headerName: "Price", minWidth: 150 },
  { field: "date", headerName: "Date Added", minWidth: 150 },
  {
    field: "tags",
    headerName: "Tags",
    minWidth: 350,
    flex: 2,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <strong>
        <TagsList categories={params.value} />
      </strong>
    ),
  },
];

export default function ItemTable() {
  const [rows, setRows] = useState<LazyItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DataStore.query(Item);
        console.log(
          "Items retrieved successfully!",
          JSON.stringify(items, null, 2)
        );
        setRows(items);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowHeight={() => "auto"} />
    </div>
  );
}
