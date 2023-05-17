import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import { DataStore } from "aws-amplify";
import { useState } from "react";
import { Category } from "../../models";
import "../../styles/TagStyle.css";
import EditCategoryChildModal from "./EditCategoryChildModal";

type EditTagProps = {
  id: string;
  name: string | undefined | null;
  description: string | undefined | null;
  handleEdit: (id: string, newName: string, newDescription: string) => void;
  handleDelete: (id: string) => void;
};

function EditTag({
  id,
  name,
  description,
  handleEdit,
  handleDelete,
}: EditTagProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditRequest = async (
    newName?: string | null,
    newDescription?: string | null
  ) => {
    if (!newName || !newDescription) return;
    // edit category on Datastore
    const originalCategory = await DataStore.query(Category, id);

    if (originalCategory) {
      await DataStore.save(
        Category.copyOf(originalCategory, (updated) => {
          const updatedCategory = {
            name: newName,
            description: newDescription,
          };
          Object.assign(updated, updatedCategory);
        })
      );
    }
    handleEdit(id, newName, newDescription);
  };

  return (
    <div className="tag">
      <IconButton aria-label="edit" size="small" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      {name}
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleDelete(id)}
      >
        <HighlightOffIcon />
      </IconButton>
      <EditCategoryChildModal
        open={open}
        handleClose={handleClose}
        handleEdit={handleEditRequest}
        id={id}
        name={name}
        description={description}
      />
    </div>
  );
}

export default EditTag;
