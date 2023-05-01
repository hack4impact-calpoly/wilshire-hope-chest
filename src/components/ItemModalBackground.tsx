import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ItemModalBackground({
  setOpenModal,
}: {
  setOpenModal: () => void;
}) {
  const [formData, setFormData] = useState({});
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index !== -1) {
      setSelectedTags(selectedTags.filter((_, i) => i !== index));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      Categories: selectedTags,
    });
  }, [selectedTags]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" onClick={setOpenModal}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Add Item</h1>
        </div>
        <div>
          {/* Textfields */}
          <Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                name="Name"
                className="textField"
                sx={{
                  width: 550,
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
                  paddingRight: 30,
                }}
              >
                <TextField
                  name="Price"
                  className="textField"
                  sx={{
                    width: 260,
                  }}
                  label="Price"
                  onChange={handleInputChange}
                />
              </div>

              {/* Date picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: 260,
                  }}
                  disableFuture
                  label="Date Added"
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
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <button
                style={{ marginRight: 10 }}
                type="button"
                className={
                  selectedTags.includes("Clothing") ? "tag" : "tagSelected"
                }
                onClick={() => handleTagClick("Clothing")}
              >
                Clothing
              </button>
              <button
                style={{ marginRight: 10 }}
                type="button"
                className={
                  selectedTags.includes("Collectibles") ? "tag" : "tagSelected"
                }
                onClick={() => handleTagClick("Collectibles")}
              >
                Collectibles
              </button>
              <button
                style={{ marginRight: 10 }}
                type="button"
                className={
                  selectedTags.includes("Jewlery") ? "tag" : "tagSelected"
                }
                onClick={() => handleTagClick("Jewlery")}
              >
                Jewlery
              </button>
              <button
                style={{ marginRight: 10 }}
                type="button"
                className={selectedTags.includes("Art") ? "tag" : "tagSelected"}
                onClick={() => handleTagClick("Art")}
              >
                Art
              </button>
              <button
                style={{ marginRight: 10, width: 150 }}
                type="button"
                className={
                  selectedTags.includes("Household Items")
                    ? "tag"
                    : "tagSelected"
                }
                onClick={() => handleTagClick("Household Items")}
              >
                Household Items
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{ borderRadius: 10 }}
              type="button"
              className="dropbtn"
              onClick={() => console.log(formData)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
