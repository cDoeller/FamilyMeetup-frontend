import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAbout from "../components/HeaderAbout";
import EventCard from "../components/EventCard";

function HomePage() {
  const [allEvents, setAllEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);


  // ** render only 6 random cards to the screen **
  useEffect(() => {
    axios
      .get(`http://localhost:5005/events`)
      .then((response) => {
        console.log(response.data);
        setAllEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get *amount* of random events
  function getRandomEvents(amount, array) {
    // only do this if we fetched all events in state
    const maxIndex = array.length;
    // getting *amount* individual random index nums in array
    let randIndexVals = [];
    while (randIndexVals.length < amount) {
      let randNum = Math.floor(Math.random() * (maxIndex));
      if (!randIndexVals.includes(randNum)) randIndexVals.push(randNum);
    }
    console.log(randIndexVals);
    // pick objects from all events based on these index nums
    let randomEventsTemp = [];
    for (let i = 0; i < randIndexVals.length; i++) {
      randomEventsTemp.push(array[randIndexVals[i]]);
    }
    console.log(randomEventsTemp);
    return randomEventsTemp
  }

  let filteredEvents = []
  if (allEvents) {
    // if a filter location is available, show filtered
    if (isFiltering) {
      // filtered = allEvents.filter
    } else {
      // if no filter input available, show random from all
      filteredEvents = getRandomEvents(6, allEvents);
    }
  }

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
          {allEvents &&
            filteredEvents.map((event) => {
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
