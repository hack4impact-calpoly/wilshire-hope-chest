import { DataStore } from "@aws-amplify/datastore";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Category, CategoryItem, Item } from "../models";
import "./TagStyle.css";
import TagsList from "./TagsList";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 350 },
  {
    field: "value",
    headerName: "Price",
    minWidth: 200,
    flex: 0.5,
    valueFormatter: (params: GridValueFormatterParams) => {
      const value = params.value as number;
      return `$${value.toFixed(2)}`;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date Added",
    minWidth: 200,
    flex: 0.5,
    valueFormatter: (params: GridValueFormatterParams) => {
      const date = new Date(params.value as string);
      return date.toLocaleDateString();
    },
  },
  {
    field: "categories",
    headerName: "Categories",
    minWidth: 350,
    flex: 2,
    renderCell: (params: GridRenderCellParams) => (
      <TagsList categories={params.value as string[]} />
    ),
    sortComparator: (v1: string[], v2: string[]) => {
      const v1Str = v1.join("");
      const v2Str = v2.join("");
      return v1Str.localeCompare(v2Str);
    },
  },
];

export default function ItemTable() {
  const [rows, setRows] = useState<any>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DataStore.query(Item);
        // for every item, retrieve the categories and add them to the item
        const temp = items.map(async (item) => {
          // query the categoryItems table for all the categoryItems that have the itemId of the current item
          const categoryItems = await DataStore.query(CategoryItem, (ci) =>
            ci.itemId.eq(item.id)
          );
          // for each categoryItem, query the category table for the category name from the categoryId in CategoryItem
          const categories = await Promise.all(
            categoryItems.map(async (ci) => {
              if (!ci.categoryId) return "";
              const category = await DataStore.query(Category, ci.categoryId);
              return category?.name;
            })
          );
          return { ...item, categories };
        });
        const itemsWithCategories = await Promise.all(temp);
        setRows(itemsWithCategories);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "70vh" }}>
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
