import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  let newDate = new Date()
  const todayDate = ((newDate.getTime()) / 1000);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/events?_sort=date_to_seconds&_order=asc&_start=${todayDate}&_limit=8`
      )
      .then((response) => {
        console.log(todayDate)
        console.log(response.data)
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sorted-events">
      <h1>Upcoming events</h1>
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

export default UpcomingEvents;
