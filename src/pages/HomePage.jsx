import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAbout from "../components/HeaderAbout";
import EventCard from "../components/EventCard";

function HomePage() {
  const [randomEvents, setRandomEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");

  // ** render only 6 random cards to the screen **
  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        console.log(response.data);
        setRandomEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ** filtering **
  useEffect(() => {}, [locationFilter]);

  return (
    <div className="page-wrapper">
      <HeaderAbout />
      <Link to="/events">
          <button className="all-events-button">show all events</button>
      </Link>
      <div className="homepage-random-events-wrapper">
        <div className="random-filter-events-wrapper">
          <label htmlFor="random-input" className="random-filter-events-label">
            random events in
          </label>
          <input
            className="random-filter-events-input"
            name="random-input"
            type="text"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
            }}
          />
        </div>
        <div className="events-list-container">
          {randomEvents &&
            randomEvents.map((event) => {
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
  );
}

export default HomePage;
