import React from 'react';
import '../Components/CalendarApp.css'
import Calendar from './Calendar/Calendar';

const CalendarApp = () => {
  return (
    <div className="calendar-app">
      <Calendar/>
      <div className="events">
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
          <button className="event-popup-close-btn">
            <i className="bx bx-x"></i>
          </button>
        </div>
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
