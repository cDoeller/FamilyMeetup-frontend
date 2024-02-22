import "../styles/EventsList.css";
import "../styles/HomePage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

function EventsListAdmin() {
  const [allEvents, setAllEvents] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setAllEvents(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleIsFiltering(input) {
    if (input === "") {
      setIsFiltering(false);
    } else {
      setIsFiltering(true);
    }
  }

  let eventsToShow = null;
  if (allEvents) {
    // if a filter title is available, show filtered
    // else, show all events
    if (isFiltering) {
      eventsToShow = allEvents.filter((event) => {
        return event.title.toLowerCase().startsWith(titleFilter);
      });
    }
    // in case not filtering and no result found, show all
    if (!eventsToShow) eventsToShow = allEvents;
  }

  return (
    <div className="page-wrapper">
      <div className="random-filter-events-wrapper" style={{ marginTop: "3rem" }}>
        <label htmlFor="title-input" className="random-filter-events-label">
          event title
        </label>
        <input
          className="random-filter-events-input"
          name="title-input"
          type="text"
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
            handleIsFiltering(e.target.value);
          }}
        />
      </div>
      <div
        className="events-list-container-eventslistpage"
        style={{ marginTop: "1rem" }}
      >
        {allEvents &&
          eventsToShow.map((event) => {
            return (
              <Link
                to={`/admin/${event.id}`}
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

export default EventsListAdmin;