import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAbout from "../components/HeaderAbout";
import EventCard from "../components/EventCard";
import "../styles/HomePage.css";

// not sure here -->
let generatedRandomBaseEvents = false;
let initialRandomEvents = [];

function HomePage() {
  const [allEvents, setAllEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/events`)
      .then((response) => {
        // console.log(response.data);
        setAllEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getRandomEvents(amount, array) {
    // only do this if we fetched all events in state
    const maxIndex = array.length;
    // getting *amount* individual random index nums in array
    let randIndexVals = [];
    while (randIndexVals.length < amount) {
      let randNum = Math.floor(Math.random() * maxIndex);
      if (!randIndexVals.includes(randNum)) randIndexVals.push(randNum);
    }
    // pick objects from all events based on these index nums
    let randomEventsTemp = [];
    for (let i = 0; i < randIndexVals.length; i++) {
      randomEventsTemp.push(array[randIndexVals[i]]);
    }
    // console.log(randomEventsTemp);
    return randomEventsTemp;
  }

  function handleIsFiltering(input) {
    if (input === "") {
      setIsFiltering(false);
    } else {
      setIsFiltering(true);
    }
    console.log(isFiltering);
  }

  let eventsToShow = [];
  if (allEvents) {
    // if a filter location is available, show filtered
    // or show initial random collection of filter not found
    if (isFiltering) {
      let foundLocation = false;
      eventsToShow = allEvents.filter((event) => {
        if (event.location.startsWith(locationFilter)) {
          foundLocation = true;
          return event.location.startsWith(locationFilter);
        }
      });
      if (!foundLocation) eventsToShow = initialRandomEvents;
    } else {
      // if no filter input available, show initial random
      if (generatedRandomBaseEvents === false) {
        initialRandomEvents = getRandomEvents(6, allEvents);
        generatedRandomBaseEvents = true;
      }
      eventsToShow = initialRandomEvents;
      console.log(eventsToShow);
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
              handleIsFiltering(e.target.value);
            }}
          />
        </div>
        <div className="events-list-container-homepage">
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
    </div>
  );
}

export default HomePage;
