import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Modal } from "@mui/material";

type DeleteCategoryChildModalProps = {
  open: boolean;
  id: string;
  name: string | undefined | null;
  handleClose: () => void;
  handleDelete: (id: string) => void;
};

function DeleteCategoryChildModal({
  open,
  id,
  name,
  handleClose,
  handleDelete,
}: DeleteCategoryChildModalProps) {
  const handleOk = () => {
    handleDelete(id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className="category-child-modal delete">
        <HighlightOffIcon
          color="error"
          sx={{ fontSize: "80px", alignSelf: "center" }}
        />
        <div>
          <h2>Do you really want to delete {name}? </h2>
          <p>
            This process cannot be undone and apply to all the related items.
          </p>
        </div>
        <div className="delete-buttons">
          <Button onClick={handleClose} sx={{ color: "#006d7d" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOk} color="error">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteCategoryChildModal;
