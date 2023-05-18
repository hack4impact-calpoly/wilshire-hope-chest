/* eslint-disable react/require-default-props */
import { Button, Modal, TextField } from "@mui/material";
import { useRef, useState } from "react";
import "../../styles/EditCategoriesModal.css";

type EditCategoryChildModalProps = {
  open: boolean;
  handleClose: () => void;
  handleEdit: (name: string, description: string) => void;
  id?: string;
  name?: string | undefined | null;
  description?: string | undefined | null;
};

function EditCategoryChildModal({
  open,
  handleClose,
  handleEdit,
  id = "",
  name = "",
  description = "",
}: EditCategoryChildModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleOk = () => {
    if (nameRef.current && nameRef.current.value && descriptionRef.current) {
      handleEdit(nameRef.current.value, descriptionRef.current.value);
      handleClose();
    } else {
      setError(true);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className="category-child-modal">
        <h3>{id ? "Edit" : "New"} Category</h3>
        <TextField
          defaultValue={name}
          label="Name"
          inputRef={nameRef}
          error={error}
          helperText={error ? "Name is required" : ""}
        />
        <TextField
          multiline
          defaultValue={description}
          label="Description"
          inputRef={descriptionRef}
          rows={2}
        />
        <div className="category-buttons">
          <Button onClick={handleClose} sx={{ color: "#006d7d" }}>
            Cancel
          </Button>
          <Button onClick={handleOk} sx={{ color: "#006d7d" }}>
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditCategoryChildModal;
