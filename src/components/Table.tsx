import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridRowModel,
  GridValidRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useState } from "react";
import TagsList from "./TagsList";

type TableProps = {
  tableHeight: string;
  rows: GridRowsProp;
  handleDeleteClick: (id: GridRowId) => () => void;
  handleRowEditCommit: (
    newRow: GridRowModel
  ) => GridValidRowModel | Promise<GridValidRowModel>;
};

export default function Table({
  tableHeight,
  rows,
  handleDeleteClick,
  handleRowEditCommit,
}: TableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => () => {
    console.log("editing id = ", id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    console.log("saving id = ", id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    console.log("canceling id = ", id);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.log("error = ", error);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 350, editable: true },
    {
      field: "value",
      headerName: "Price",
      minWidth: 200,
      flex: 0.5,
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return `$${value.toFixed(2)}`;
      },
      editable: true,
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
      editable: true,
    },
    {
      field: "cats",
      headerName: "Categories",
      minWidth: 250,
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <TagsList categories={params.value as string[]} />
      ),
      sortComparator: (v1: string[], v2: string[]) => {
        const v1Str = v1.join("");
        const v2Str = v2.join("");
        return v1Str.localeCompare(v2Str);
      },
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ height: tableHeight }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowHeight={() => "auto"}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={handleRowEditCommit}
        onProcessRowUpdateError={handleProcessRowUpdateError}
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
