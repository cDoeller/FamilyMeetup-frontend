import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import HeaderAboutEvents from "../components/HeaderAboutEvents";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="events-list-header-wrapper">
        <HeaderAboutEvents />
        <Link to="/events/create" className="all-events-button-wrapper">
          <button className="create-event-button">Create Event</button>
        </Link>
      </div>
      <FilterAllEvents />
      <div className="events-list-container">
        {events &&
          events.map((event) => {
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
