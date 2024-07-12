import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateBook.scss";
const DateBook = () => {
  return (
    <div className="dateBookContainer">
      <Calendar selectRange={true} />
    </div>
  );
};

export default DateBook;
