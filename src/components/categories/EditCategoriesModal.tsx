import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal } from "@mui/material";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Category, ItemCategory, LazyCategory } from "../../models";
import "../../styles/EditCategoriesModal.css";
import EditCategoryChildModal from "./EditCategoryChildModal";
import EditTag from "./EditTag";

function EditCategoriesModal() {
  const [categories, setCategories] = useState<LazyCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await DataStore.query(Category);
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    await DataStore.delete(Category, (c) => c.id.eq(id));
    await DataStore.delete(ItemCategory, (ic) => ic.categoryId.eq(id));
    const newCategories = categories.filter((c) => c.id !== id);
    setCategories(newCategories);
  };

  const handleAdd = async (name: string, description: string) => {
    const newCategory = await DataStore.save(
      new Category({
        name,
        description,
      })
    );
    setCategories([...categories, newCategory]);
  };

  // update the state with updated category
  const handleEdit = (id: string, newName: string, newDescription: string) => {
    const newCategories = categories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          name: newName,
          description: newDescription,
        };
      }
      return c;
    });
    setCategories(newCategories);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ backgroundColor: "#006d7d", borderRadius: 10 }}
        startIcon={<EditIcon />}
      >
        Edit Categories
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-categories-modal-title"
        aria-describedby="edit add or remove categories"
      >
        <div className="category-main">
          <div className="category-body">
            <h3>Edit Categories</h3>
            <div className="category-tags">
              {categories.map((category) => (
                <EditTag
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            <Button
              sx={{ color: "#006d7d" }}
              startIcon={<AddIcon />}
              onClick={() => setAddOpen(true)}
            >
              Add
            </Button>
          </div>
          <div className="category-buttons">
            <Button onClick={handleClose} sx={{ color: "#006d7d" }}>
              Close
            </Button>
          </div>
          <EditCategoryChildModal
            open={addOpen}
            handleClose={() => setAddOpen(false)}
            handleEdit={handleAdd}
          />
        </div>
      </Modal>
    </>
  );
}

export default EditCategoriesModal;
