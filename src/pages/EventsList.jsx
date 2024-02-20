import "../EventsList.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import HeaderAboutEvents from "../components/HeaderAboutEvents";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  const [eventsToShow, setEventsToShow] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        // console.log(response.data);
        setAllEvents(response.data);
        setEventsToShow(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="events-list-header-wrapper">
        <HeaderAboutEvents />
        <div className="all-events-button-wrapper">
          <Link to="/events/create">
            <button className="create-event-button">Create Event</button>
          </Link>
        </div>
      </div>
      <FilterAllEvents eventsToShow={eventsToShow} allEvents={allEvents} setEventsToShow={setEventsToShow} />
      <div className="events-list-container-eventslistpage">
        {allEvents &&
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
  );
}

export default EventsList;
