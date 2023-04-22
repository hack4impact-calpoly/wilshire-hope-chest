import "./TagStyle.css";
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
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowHeight={() => "auto"} />
    </div>
  );
}
