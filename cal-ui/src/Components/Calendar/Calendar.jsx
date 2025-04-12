import React from 'react';
import { useState } from 'react';
import '../Calendar/Calendar.css';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const curDate = new Date();

  const [curMonth, setCurMonth] = useState(curDate.getMonth());
  const [curYear, setCurYear] = useState(curDate.getFullYear());

  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(curYear, curMonth, 1).getDay();

  const prevMonth = () => {
    setCurMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurYear(prevYear => (curMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurYear(prevYear => (curMonth === 11 ? prevYear + 1 : prevYear));
  };
  return (
    <div className="calendar">
      <h1 className="heading"> Calendar </h1>
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[curMonth]} </h2>
        <h2 className="year">{curYear}</h2>
        <div className="cal-btns">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth).keys()].map(day => (
          <span
            key={day + 1}
            className={
              day + 1 === curDate.getDate() &&
              curMonth === curDate.getMonth() &&
              curYear === curDate.getFullYear()
                ? 'current-day'
                : ''
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
