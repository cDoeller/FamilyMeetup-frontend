import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
function PopularEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/events?_sort=participants&_order=desc&_limit=8")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="popular-events">
      <h1>Popular events</h1>
      <div className="events-list-container-homepage">
        {events.map((event) => {
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

export default PopularEvents;
