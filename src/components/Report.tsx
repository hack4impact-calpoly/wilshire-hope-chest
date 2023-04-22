import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Report.css";
import { BsCalendarEvent } from "react-icons/bs";

export default function Report() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className="report_box">
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
              onChange={(date) => setStartDate(date)}
              placeholderText="mm/dd/yy"
            />
          </table>
        </div>
        <div id="divMessage" className="InsideContent">
          <DatePicker
            className="date_box2"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
          />
        </div>
      </div>
      <p id="sales-text"> Total Sales: $ </p>
      <p id="catt"> Clothing </p>
      <span id="subtitle"> Total Sales: $</span>
      <span id="subtitle2"> Total Items: </span>
      <p id="cat"> Jewlery </p>
      <span id="subtitle"> Total Sales: $</span>
      <span id="subtitle2"> Total Items: </span>
      <p id="cat"> Household Items </p>
      <span id="subtitle"> Total Sales: $</span>
      <span id="subtitle2"> Total Items: </span>
      <p id="cat"> Art </p>
      <span id="subtitle"> Total Sales: $</span>
      <span id="subtitle2"> Total Items: </span>
      <p id="cat"> Collectibles </p>
      <span id="subtitle"> Total Sales: $</span>
      <span id="subtitle2"> Total Items: </span>
    </div>
  );
}
