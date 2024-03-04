import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import "../styles/Upcoming&PopularEvents.css"
function PopularEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events?_sort=participants&_order=desc&_limit=6`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sorted-events">
      <h1 className="popular-upcoming-headline">Popular events</h1>
      <div className="events-list-container-sorted">
        {events.map((event) => {
          return (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="event-card event-card-upcoming-popular"
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
