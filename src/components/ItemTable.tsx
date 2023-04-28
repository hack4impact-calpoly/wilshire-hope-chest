import "./TagStyle.css";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataStore } from "@aws-amplify/datastore";
import { useEffect } from "react";
// import TagsList from "./TagsList";
import { Item } from "../models";

// Sample data, should remove it after the fetch call is fixed
// Skip the categorys since the type unmatched
const rows: GridRowsProp = [
  {
    id: 1,
    name: "Air Jordan",
    dataAdded: "2/14/2023",
    value: 60,
    image: "",

    createdAt: "2023-03-12T01:32:37.785Z",
    updatedAt: "2023-03-12T01:32:37.785Z",
  },
  {
    id: 2,
    name: "New balance sneaker",
    dataAdded: "2/23/2023",
    value: "$60",
    categorys: ["Alothing", "tag2", "tag3", "tag4", "tag5"],
    createdAt: "2023-03-13T01:32:37.785Z",
    updatedAt: "2023-03-13T01:32:37.785Z",
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "value", headerName: "Price", minWidth: 150 },
  { field: "dataAdded", headerName: "Date Added", minWidth: 150 },
  { field: "createdAt", headerName: "Created At", minWidth: 150 },
  { field: "updatedAt", headerName: "Updated At", minWidth: 150 },
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
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowHeight={() => "auto"} />
    </div>
  );
}
