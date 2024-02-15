import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderAbout from "../components/HeaderAbout";

function HomePage() {
  const [locationFilter, setLocationFilter] = useState("");

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
        {/* MAP HERE AS SOON AS DATA AVAILABLE */}
      </div>
    </div>
  );
}

export default HomePage;
