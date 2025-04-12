import React from 'react';
import { useState } from 'react';
import '../Components/CalendarApp.css';
import Calendar from './Calendar/Calendar';

const CalendarApp = () => {
  const curDate = new Date();
  const [curMonth, setCurMonth] = useState(curDate.getMonth());
  const [curYear, setCurYear] = useState(curDate.getFullYear());

  const [selectedDate, SetSelectedDate] = useState(curDate);
  const [showEventPopup, SetShowEventPopup] = useState(false);

  const prevMonth = () => {
    setCurMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurYear(prevYear => (curMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurYear(prevYear => (curMonth === 11 ? prevYear + 1 : prevYear));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDayClick = day => {
    const clickedDate = new Date(curYear, curMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      SetSelectedDate(clickedDate);
      SetShowEventPopup(true);
    }
    // console.log(showEventPopup,clickedDate)
  };

  return (
    <div className="calendar-app">
      <Calendar
        curMonth={curMonth}
        curYear={curYear}
        curDate={curDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        handleDayClick={handleDayClick}
      />

      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="event-time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={23}
                className="hours"
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={59}
                className="minutes"
              />
            </div>
            <textarea placeholder="Enter Event Title (Max 20 Characters)"></textarea>
            <textarea placeholder="Enter Event Description (Max 120 Characters)"></textarea>
            <div className="event-media">
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                className="event-media-input"
              />
              <button className="event-media-remove-btn">
                <i className="bx bxs-trash-alt"></i>
              </button>
            </div>
            <button className="event-popup-btn">Add Event</button>
            <button
              className="event-popup-close-btn"
              onClick={() => SetShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">May, 12, 2024</div>
            <div className="event-time">12:00</div>
          </div>
          <div className="event-content">
            <div className="event-title"> Appelute Meeting</div>
            <div className="event-text">
              This is meeting for discussion on further steps
            </div>
            {/* <div className="event-media">
            <video controls className="event-video">
          <source src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  </div> */}
          </div>

          <div className="event-btns">
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-message-alt-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
