import "./ItemTable.css";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import TagsList from "./TagsList";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Air Jordan Air Jordan Air Jordan Air Jordan Air Jordan",
    price: "$60",
    date: "2/23/2023",
    tags: ["Clothing", "tag2"],
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "price", headerName: "Price", minWidth: 100 },
  { field: "date", headerName: "Date Added", minWidth: 170 },
  {
    field: "tags",
    headerName: "Tags",
    flex: 1,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <strong>
        <TagsList categories={params.value} />
      </strong>
    ),
  },
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
