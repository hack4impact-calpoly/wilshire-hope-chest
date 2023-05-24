import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarEvent } from "react-icons/bs";
import "../styles/Report.css";
import { DataStore } from "aws-amplify";
import { Item } from "../models";

export default function Report() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);

  useEffect(() => {
    const calculateTotalValue = async () => {
      let filteredItems = [];

      if (startDate && endDate) {
        filteredItems = await DataStore.query(Item, (c) =>
          c.dateAdded.between(startDate.toISOString(), endDate.toISOString())
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
      return;
    }
    setEndDate(date);
  };

  return (
    <div className="report_box">
      <span className="intro-text"> Enter Dates </span>
      <span id="icon">
        <BsCalendarEvent />
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
      <p id="sales-text"> Total Sales: $ {totalSales}</p>
    </div>
  );
}
