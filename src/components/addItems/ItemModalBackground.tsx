import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataStore } from "aws-amplify";
import { GridRowsProp } from "@mui/x-data-grid";
import { Category, LazyCategory } from "../../models";

export default function ItemModalBackground({
  setOpenModal,
  rows,
  setRows,
}: {
  setOpenModal: () => void;
  rows: GridRowsProp;
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
}) {
  interface FormData {
    DateAdded: dayjs.Dayjs;
    Name: string;
    Price: string;
    Categories: string[];
  }

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    DateAdded: dayjs(),
    Name: "",
    Price: "0",
    Categories: [],
  });
  const [categories, setCategories] = useState<LazyCategory[]>([]);

  useEffect(() => {
    setFormData({
      ...formData,
      Categories: selectedTags,
    });
  }, [selectedTags]);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await DataStore.query(Category);
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagClick = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index !== -1) {
      setSelectedTags(selectedTags.filter((_, i) => i !== index));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    console.log(rows);
    if (
      formData["Name" as keyof typeof formData] === undefined ||
      formData["Name" as keyof typeof formData] === ""
    ) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (
      formData["Price" as keyof typeof formData] === undefined ||
      formData["Price" as keyof typeof formData] === "" ||
      Number.isNaN(Number(formData["Price" as keyof typeof formData]))
    ) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
    // close the modal if fields are valid
    if (
      formData["Name" as keyof typeof formData] !== undefined &&
      formData["Name" as keyof typeof formData] !== "" &&
      formData["Price" as keyof typeof formData] !== undefined &&
      formData["Price" as keyof typeof formData] !== "" &&
      !Number.isNaN(Number(formData["Price" as keyof typeof formData]))
    ) {
      // TODO: implement counter for unique id
      const newRow = {
        id: rows.length + 1,
        name: formData["Name" as keyof typeof formData],
        dateAdded: formData["DateAdded" as keyof typeof formData],
        value: parseFloat(formData.Price),
        cats: formData["Categories" as keyof typeof formData],
      };
      setRows((prevRows) => [...prevRows, newRow]);
      setOpenModal();
      console.log(rows);
    }
  };

  return (
    <div
      className="modalBackground"
      style={{ zIndex: 9999, position: "absolute", right: "0px", top: "0px" }}
    >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" onClick={setOpenModal}>
            X
          </button>
        </div>
        <div style={{ marginLeft: 25 }} className="title">
          <h1>Add Item</h1>
        </div>
        <div>
          {/* Textfields */}
          <Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                error={nameError}
                helperText={nameError ? "Name Required" : ""}
                name="Name"
                className="textField"
                // remove added padding from helperText using sx
                sx={{
                  width: 600,
                  height: 80,
                }}
                label="Name"
                onChange={handleInputChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: 10,
                }}
              >
                <TextField
                  error={priceError}
                  helperText={priceError ? "Enter Valid Dollar Amount" : ""}
                  name="Price"
                  className="textField"
                  sx={{
                    width: 295,
                    height: 60,
                  }}
                  label="Price"
                  onChange={handleInputChange}
                />
              </div>

              {/* Date picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: 295,
                  }}
                  disableFuture
                  label="Date Added"
                  value={dayjs()} // default to today
                  onChange={(newValue) => {
                    setFormData({ ...formData, DateAdded: newValue! });
                  }}
                />
              </LocalizationProvider>
            </div>
          </Box>

          {/* Selected Buttons indicator */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20,
                paddingTop: 20,
                marginLeft: 25,
              }}
            >
              <div style={{ marginRight: 10 }}>
                <h3>Select Tags</h3>
              </div>
              <div>
                <button
                  type="button"
                  className={selectedTags.length > 0 ? "tag" : "tagSelected"}
                >
                  {selectedTags.length} selected
                </button>
              </div>
            </div>

            {/* Category Selectable Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "center",
              }}
            >
              {/* Map tags to categories name fields */}
              {categories.map((category) => (
                <button
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    width: category.name === "Household Items" ? 150 : 100,
                  }}
                  type="button"
                  className={
                    selectedTags.includes(category.name!)
                      ? "tag"
                      : "tagSelected"
                  }
                  onClick={() => handleTagClick(category.name!)}
                  key={category.name}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{ borderRadius: 10 }}
              type="button"
              className="dropbtn"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
