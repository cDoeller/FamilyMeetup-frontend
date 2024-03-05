import "../styles/EventsList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import HeaderAbout from "../components/HeaderAbout";
import { Link } from "react-router-dom";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  //  passed to filter all component --> all fetching done there
  const [eventsToShow, setEventsToShow] = useState(null);

  const [clicked, setClicked] = useState (false);

  const todayDate = new Date();
  const todayDateMillis = todayDate.getTime();

  const headlineAbout = (
    <h1 className="header-about-title">
      Browse, Filter and Create family events in your area!
    </h1>
  );
  const subHeadlineAbout = (
    <h3 className="header-about-subtitle">
      With this tool you can browse through all upcoming events and find the right one for you and your family. 
      Use the filters and dropdown menus in the  <span className="text-focus-span">search bar</span>. 
      Click on the  <span className="text-focus-span">button</span> on the right to create an event yourself and share it with others!
    </h3>
  );

  return (
    <>
      <div onClick={()=>{setClicked(!clicked)}}>
        <div className="homepage-header-wrapper">
          <HeaderAbout
            headlineAbout={headlineAbout}
            subHeadlineAbout={subHeadlineAbout}
          />
          <div className="homepage-stories-button-wrapper">
            <Link to="/events/create">
              <button className="create-event-button">Create Event</button>
            </Link>
          </div>
        </div>
        <div className="page-wrapper">
          <FilterAllEvents
            eventsToShow={eventsToShow}
            setEventsToShow={setEventsToShow}
            todayDateMillis={todayDateMillis}
            clicked = {clicked}
          />
          <div className="events-list-container-eventslistpage">
            {eventsToShow &&
              eventsToShow.map((event) => {
                return (
                  <Link
                    to={`/events/${event.id}`}
                    key={event.id}
                    className="event-card"
                  >
                    <EventCard event={event} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsList;
