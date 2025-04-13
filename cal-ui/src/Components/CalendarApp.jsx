import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../Components/CalendarApp.css';
import Calendar from './Calendar/Calendar';
import { useSocket } from '../Context/SocketContext';

const CalendarApp = () => {
  function formatDate(dateInput) {
    const date = new Date(dateInput);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted.replace(',', '');
  }
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
  //*********************** */

  const [events, setEvents] = useState([]);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);

  const socket = useSocket(); // Get the socket instance from context

  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    console.log('Updated events:', events);
  }, [events]);

  useEffect(() => {
    if(!socket) return;
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('eventStarting',(event) => {
      console.log('Event starting:', event);
      // setEvents(prevEvents => [...prevEvents, event]);
    })

  }, [socket]);

  const handleAddEvent = () => {
    const newEvent = {
      id : new Date(),
      time: `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`,
      date: selectedDate,
      title,
      description,
      media,
    };

    setEvents(prev => [...prev, newEvent]);

    // Clear form
    setHours('');
    setMinutes('');
    setTitle('');
    setDescription('');
    setMedia(null);

    SetShowEventPopup(false);
  };

  const handleMediaChange = e => {
    const file = e.target.files[0];
    setMedia(file);
  };

  const removeMedia = () => {
    setMedia(null);
    setMedia(null); // Remove file from state
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input field
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };
  //************//
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
                value={hours}
                onChange={e => setHours(e.target.value)}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={59}
                className="minutes"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Enter Event Title (Max 20 Characters)"
              maxLength={20}
              value={title}
              onChange={e => setTitle(e.target.value)}
            ></textarea>
            <textarea
              placeholder="Enter Event Description (Max 120 Characters)"
              maxLength={120}
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
            <div className="event-media">
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                className="event-media-input"
                onChange={handleMediaChange}
                ref={fileInputRef}
              />
              {media && (
                <button
                  className="event-media-remove-btn"
                  onClick={removeMedia}
                >
                  <i className="bx bxs-trash-alt"></i>
                </button>
              )}
            </div>
            <button className="event-popup-btn" onClick={handleAddEvent}>
              Add Event
            </button>
            <button
              className="event-popup-close-btn"
              onClick={() => SetShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {events.map(
          event =>
            isSameDay(event.date, selectedDate) && (
              <div key={event.id} className="event">
                <div className="event-date-wrapper">
                  {console.log(selectedDate)}
                  <div className="event-date">{formatDate(event.date)}</div>
                  <div className="event-time">{event.time}</div>
                </div>

                <div className="event-content">
                  <div className="event-title">{event.title}</div>
                  <div className="event-text">{event.description}</div>

                  {event.media &&
                    (event.media.type.startsWith('video/') ? (
                      <video
                        src={URL.createObjectURL(event.media)}
                        controls
                        className="event-media-content"
                      ></video>
                    ) : event.media.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(event.media)}
                        alt={event.media.name}
                        className="event-media-content"
                      />
                    ) : null)}
                </div>

                <div className="event-btns">
                  <i className="bx bxs-edit-alt"></i>
                  <i className="bx bxs-trash-alt"  onClick={() => handleDeleteEvent(event.id)}></i>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
