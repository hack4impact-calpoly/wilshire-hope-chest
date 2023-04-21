import "./ItemTable.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Air Jordan",
    price: "$60",
    date: "2/23/2023",
    tags: ["Clothing", "tag2"],
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 350 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "date", headerName: "Date Added", width: 170 },
  { field: "tags", headerName: "Tags", width: 150 },
];

// type Item = {
//   id: String; // Amplify shows tyep = ID!
//   name: String;
//   dateAdded: Date;
//   value: number; // ts doesn't have float
//   image: String;
// };

// type ItemListProps = {
//   items: Item[];
// };

export default function ItemTable() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
