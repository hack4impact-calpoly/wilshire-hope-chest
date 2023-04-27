import "./TagStyle.css";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import { Item, LazyItem } from "../models";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Air Jordan",
    price: "$60",
    date: "2/14/2023",
    tags: ["Clothing", "tag3", "tag4"],
  },
  {
    id: 2,
    name: "New balance sneaker",
    price: "$120",
    date: "2/23/2023",
    tags: ["Alothing", "tag2", "tag3", "tag4", "tag5"],
  },
];

// const fetchData = async () => {
//   try {
//     const posts = await DataStore.query(Category);
//     console.log(
//       "Posts retrieved successfully!",
//       JSON.stringify(posts, null, 2)
//     );
//     return posts;
//   } catch (error) {
//     console.log("Error retrieving posts", error);
//     return error;
//   }
// };

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
  const [columnsList, setColumnsList] = useState<LazyItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await DataStore.query(Item);
        console.log(
          "Posts retrieved successfully!",
          JSON.stringify(posts, null, 2)
        );
        console.log("posts = ", posts);
        setColumnsList(posts);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };

    fetchData();
    console.log("columnsList = ", columnsList);
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowHeight={() => "auto"} />
    </div>
  );
}
