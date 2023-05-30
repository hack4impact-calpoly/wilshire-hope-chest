/* eslint-disable react/no-unstable-nested-components */
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import { Button, Modal } from "@mui/material";
import { DataStore } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarEvent } from "react-icons/bs";
import ReactToPrint from "react-to-print";
import { Item } from "../models";
import "../styles/Report.css";

export default function Report() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2020-01-02T00:00:00.000Z")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const componentRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [totalSales, setTotalSales] = useState<number | null>(null);

  useEffect(() => {
    const calculateTotalValue = async () => {
      let filteredItems = [];

      if (startDate && endDate && endDate < startDate) {
        // End date is before start date, do not update the end date state
        setErrorMessage(
          "Please Select an End date that is before the Start Date"
        );
        return;
      }

      if (startDate && endDate) {
        const prevDay = new Date(startDate);
        prevDay.setDate(prevDay.getDate() - 1);
        filteredItems = await DataStore.query(Item, (c) =>
          c.dateAdded.between(prevDay.toISOString(), endDate.toISOString())
        );
      } else if (startDate) {
        const prevDay = new Date(startDate);
        prevDay.setDate(prevDay.getDate() - 1);

        filteredItems = await DataStore.query(Item, (c) =>
          c.dateAdded.gt(prevDay.toISOString())
        );
      } else if (endDate) {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);

        filteredItems = await DataStore.query(Item, (c) =>
          c.dateAdded.lt(nextDay.toISOString())
        );
      } else {
        filteredItems = await DataStore.query(Item);
      }

      const totalValue = filteredItems.reduce((sum, item) => {
        if (item.value != null) {
          return sum + item.value;
        }
        return sum;
      }, 0);

      const roundedTotal = Math.round(totalValue * 100) / 100; // Round to nearest 0.01
      setTotalSales(roundedTotal);
    };

    calculateTotalValue();
  }, [startDate, endDate]);

  const handleEndDateChange = (date: Date | null) => {
    if (startDate && date && date < startDate) {
      // End date is before start date, do not update the end date state
      setErrorMessage(
        "Please Select an End date that is before the Start Date"
      );
      setEndDate(null);
    } else {
      setErrorMessage(null);
      setEndDate(date);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<DescriptionIcon />}
        sx={{ backgroundColor: "#006d7d", borderRadius: 10 }}
      >
        Create Report
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="report_box">
          <ReactToPrint
            trigger={() => (
              <Button
                variant="text"
                startIcon={<PrintIcon />}
                sx={{ color: "#006d7d" }}
              >
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef}>
            <span className="intro-text"> Enter Dates </span>
            <span id="icon">
              <BsCalendarEvent />{" "}
            </span>
            <div id="segment">
              <div id="divTable" className="InsideContent">
                <table id="logtable">
                  <DatePicker
                    className="date_box"
                    selected={startDate}
                    onChange={(date: Date | null) => {
                      setStartDate(date);
                    }}
                    placeholderText="Start Date"
                  />
                </table>
              </div>
              <div id="divMessage" className="InsideContent">
                <DatePicker
                  className="date_box2"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  placeholderText="End Date"
                />
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p id="sales-text"> Total Sales: $ {totalSales}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
