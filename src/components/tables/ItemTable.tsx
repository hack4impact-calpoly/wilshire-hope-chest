import { GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Category, Item, ItemCategory } from "../../models";
import Table from "./Table";

export default function ItemTable() {
  const [rows, setRows] = useState<GridRowsProp>([]);

  const handleDeleteClick = (id: GridRowId) => async () => {
    console.log("deleting id = ", id);
    const rowToDelete = await DataStore.query(Item, (itemId) =>
      itemId.id.eq(id.toString())
    );
    console.log("toDelete =", rowToDelete);

    if (rowToDelete.length === 1) {
      try {
        DataStore.delete(rowToDelete[0]);
        console.log("Row deleted");
      } catch (error) {
        console.log("Error! cannot remove the item ", error);
      }
    }

    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowEditCommit = async (newRow: GridRowModel) => {
    let categories = newRow.cats;
    let editCats = false;
    if (typeof categories === "string") {
      categories = categories.replace(/\s/g, "").split(",").sort();
      editCats = true;
    }
    const rowFormatter = {
      ...newRow,
      value: parseFloat(newRow.value),
      cats: categories,
    };

    // find the item first
    const row = await DataStore.query(Item, (item) => item.id.eq(newRow.id));

    if (row) {
      try {
        // update the Item
        const updatedItem = await DataStore.save(
          Item.copyOf(row[0], (updated) => {
            const rowFormatterCopy = { ...rowFormatter };
            delete rowFormatterCopy.cats;
            Object.assign(updated, rowFormatterCopy);
          })
        );
        console.log("Updated the Item = ", updatedItem);

        // update the Category
        if (editCats) {
          // Get all the existing category
          const allCategories = await DataStore.query(Category);
          // list all the existing category name
          const allCategoryNames = allCategories.map(
            (category) => category.name
          );
          // Get the invalid name
          const invalidCategoryNames = categories.filter(
            (name: string) => !allCategoryNames.includes(name)
          );
          // Throw error if there is any invalid category name
          if (invalidCategoryNames.length > 0) {
            throw new Error(
              `Error! Invalid category names: ${invalidCategoryNames.join(
                ", "
              )}`
            );
            // update ItemCategory
          } else {
            // Get the old categories associated with the item
            const oldCategories = await DataStore.query(ItemCategory, (ic) =>
              ic.itemId.eq(newRow.id)
            );
            // Get the ID of the old categories
            const getOldCategoriesID = oldCategories.map(
              (category) => category.categoryId
            );

            // Get all the IDs that need to be added
            const IdsToAdd = allCategories
              .filter((category) => categories.includes(category.name))
              .filter((category) => !getOldCategoriesID.includes(category.id))
              .map((category) => category.id);
            if (IdsToAdd.length > 0) {
              IdsToAdd.map(async (cID) => {
                const categoryToAdd = await DataStore.query(Category, (c) =>
                  c.id.eq(cID)
                );
                const categoryItem = new ItemCategory({
                  item: updatedItem,
                  category: categoryToAdd[0],
                });
                await DataStore.save(categoryItem);
                console.log("Added categoryItem = ", categoryItem);
              });
            }

            // Remove the old categories
            const IdToDelete = allCategories
              .filter((category) => getOldCategoriesID.includes(category.id))
              .filter((category) => !categories.includes(category.name))
              .map((category) => category.id);
            if (IdToDelete.length > 0) {
              IdToDelete.map(async (cID) => {
                const categoryToDelete = await DataStore.query(
                  ItemCategory,
                  (ic) =>
                    ic.and((ic1) => [
                      ic1.categoryId.eq(cID),
                      ic1.itemId.eq(updatedItem.id),
                    ])
                );
                await DataStore.delete(categoryToDelete[0]);
                console.log("Removed categoryItem = ", categoryToDelete[0]);
              });
            }
          }
        }
      } catch (error) {
        console.log("Error! Cannot update the row ", error);
      }
    }
    return rowFormatter;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DataStore.query(Item);
        // for every item, retrieve the categories and add them to the item
        const temp = items.map(async (item) => {
          // query the itemCategories table for all the itemCategories that have the itemId of the current item
          const itemCategories = await DataStore.query(ItemCategory, (ci) =>
            ci.itemId.eq(item.id)
          );
          // for each categoryItem, query the category table for the category name from the categoryId in ItemCategory
          const categories = await Promise.all(
            itemCategories.map(async (ci) => {
              if (!ci.categoryId) return "";
              const category = await DataStore.query(Category, ci.categoryId);
              return category?.name;
            })
          );
          return { ...item, cats: categories };
        });
        const itemsWithCategories: Item[] = await Promise.all(temp);
        setRows(itemsWithCategories);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };
    fetchData();
  }, [rows]);

  return (
    <Table
      tableHeight="70vh"
      rows={rows}
      handleDeleteClick={handleDeleteClick}
      handleRowEditCommit={handleRowEditCommit}
    />
  );
}
