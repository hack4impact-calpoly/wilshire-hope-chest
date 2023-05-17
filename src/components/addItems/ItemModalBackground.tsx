import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ItemModalBackground({
  setOpenModal,
}: {
  setOpenModal: () => void;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      ...formData,
      Categories: selectedTags,
    });
  }, [selectedTags]);

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
      setOpenModal();
    }
  };

  return (
    <div className="modalBackground">
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
                sx={{
                  width: 600,
                  paddingBottom: 2,
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
                    setFormData({ ...formData, DateAdded: newValue });
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
                flexDirection: "row",
                paddingBottom: 30,
                justifyContent: "center",
              }}
            >
              {/* Category Selectable Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 30,
                  justifyContent: "center",
                }}
              >
                {/* Map tag names to their buttons */}
                {[
                  "Clothing",
                  "Collectibles",
                  "Jewlery",
                  "Art",
                  "Household Items",
                ].map((tag) => (
                  <button
                    style={{
                      marginRight: 10,
                      width: tag === "Household Items" ? 150 : 100,
                    }}
                    type="button"
                    className={
                      selectedTags.includes(tag) ? "tag" : "tagSelected"
                    }
                    onClick={() => handleTagClick(tag)}
                    key={tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
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
