import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAbout from "../components/HeaderAbout";

function HomePage() {
  const [randomEvents, setRandomEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");

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

  return (
    <div>
      <HeaderAbout />
      <Link to="/events">
        <button className="all-events-button">show all events</button>{" "}
      </Link>
      <div className="random-filter-events-wrapper">
        <label htmlFor="random-input">
          random events in
          <input
            className="random-filter-events-input"
            name="random-input"
            type="text"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="events-list-container">
        {randomEvents &&
          randomEvents.map((event) => {
            return (
              <Link key={event.id} className="event-card">
                <div className="event-card-image-wrapper">
                  <img
                    src={event.image_url}
                    alt=""
                    className="event-card-image"
                  />
                </div>
                <h3 className="event-card-title">{event.title}</h3>
                <h3 className="event-card-datetime">
                  {event.time + " " + event.date}
                </h3>
                <p className="event-card-description">{event.description}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
