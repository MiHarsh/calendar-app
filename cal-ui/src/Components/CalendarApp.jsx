import React from 'react';

const CalendarApp = () => {
  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading"> Calendar </h1>
        <div className="navigate-date">
          <h2 className="month">Apr, </h2>
          <h2 className="year">2025</h2>
          <div className="btns">
            <i className="bx bx-chevron-left bx-xl"></i>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
        <div className="weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <div className="days">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span className="current-day">12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
          <span>18</span>
          <span>19</span>
          <span>20</span>
          <span>21</span>
          <span>22</span>
          <span>23</span>
          <span>24</span>
          <span>25</span>
          <span>26</span>
          <span>27</span>
          <span>28</span>
          <span>29</span>
          <span>30</span>
          <span>31</span>
        </div>
      </div>
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
