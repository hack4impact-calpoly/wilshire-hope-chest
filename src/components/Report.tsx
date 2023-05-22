import React, { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarEvent } from "react-icons/bs";
import "../styles/Report.css";
import { API } from "aws-amplify";

export default function Report() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [categorySales, setCategorySales] = useState<{
    [category: string]: number;
  }>({});
  const [categoryItems, setCategoryItems] = useState<{
    [category: string]: number;
  }>({});

  const getTotalSales = async () => {
    try {
      const startDateString = startDate ? startDate.toISOString() : "";
      const endDateString = endDate ? endDate.toISOString() : "";

      const response = await API.graphql({
        query: `
          query GetTotalSales($startDate: AWSDate, $endDate: AWSDate) {
            items(filter: {
              dateAdded: {
                between: [$startDate, $endDate]
              }
            }) {
              items {
                categories {
                  name
                }
                value
              }
            }
          }
        `,
        variables: {
          startDate: startDateString,
          endDate: endDateString,
        },
      });

      console.log(response);
      if ("data" in response) {
        const { data } = response;
        let totalSalesValue = 0;
        const categorySalesData: { [category: string]: number } = {};
        const categoryItemsData: { [category: string]: number } = {};

        const items = data.items?.items;

        if (items) {
          totalSalesValue = items.reduce(
            (total: number, item: any) => total + item.value,
            0
          );

          items.forEach((item: any) => {
            const { categories } = item;
            const { value } = item;

            categories.forEach((category: any) => {
              const categoryName = category.name;

              // Calculate total sales per category
              categorySalesData[categoryName] =
                (categorySalesData[categoryName] || 0) + value;

              // Calculate total items per category
              categoryItemsData[categoryName] =
                (categoryItemsData[categoryName] || 0) + 1;
            });
          });
        }

        setTotalSales(totalSalesValue);
        setCategorySales(categorySalesData);
        setCategoryItems(categoryItemsData);
      }
    } catch (error) {
      console.error("Error calculating total sales:", error);
      // Handle the error state or display an error message
    }
  };

  const handleTotalSales = useCallback(async () => {
    await getTotalSales();
  }, []);

  useEffect(() => {
    handleTotalSales();
  }, [handleTotalSales]);

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
              placeholderText="Start Date"
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
      <p id="sales-text"> Total Sales: $ {totalSales} </p>
      {Object.entries(categorySales).map(([category, sales]) => (
        <div key={category}>
          <p id="cat"> {category} </p>
          <span id="subtitle"> Total Sales: $ {sales} </span>
          <span id="subtitle2">
            Total Items: {categoryItems[category] || 0}
          </span>
        </div>
      ))}
    </div>
  );
}
