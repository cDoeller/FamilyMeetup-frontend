import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAbout from "../components/HeaderAbout";
import EventCard from "../components/EventCard";
import "../styles/HomePage.css";
import UpcomingEvents from "../components/UpcomingEvents";
import PopularEvents from "../components/PopularEvents";

// not sure here -->
let generatedRandomBaseEvents = false;
let initialRandomEvents = [];

function HomePage() {
  const [allUpcomingEvents, setAllUpcomingEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const headlineAbout = (
    <h1 className="header-about-title">
      Have you ever wondered how you can make new friends despite your full-time
      job and busy family life?
    </h1>
  );
  const subHeadlineAbout = (
    <h3 className="header-about-subtitle">
      With <span className="text-focus-span">Family Events</span> you can find family friendly activities in your area.
      Publish your personal stories, create your own events and invite people to
      join in. The best part: your whole family can be sure to spend the day
      with like-minded people!
    </h3>
  );

  const todayDate = new Date();
  const todayDateMillis = todayDate.getTime();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_gte=${todayDateMillis}`
      )
      .then((response) => {
        // console.log(response.data);
        setAllUpcomingEvents(response.data);
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
  if (allUpcomingEvents) {
    // if a filter location is available, show filtered
    // or show initial random collection of filter not found
    if (isFiltering) {
      let foundLocation = false;
      eventsToShow = allUpcomingEvents.filter((event) => {
        if (event.location.includes(locationFilter)) {
          foundLocation = true;
          return event.location.includes(locationFilter);
        }
      });
      if (!foundLocation) eventsToShow = initialRandomEvents;
    } else {
      // if no filter input available, show initial random
      if (generatedRandomBaseEvents === false) {
        initialRandomEvents = getRandomEvents(6, allUpcomingEvents);
        generatedRandomBaseEvents = true;
      }
      eventsToShow = initialRandomEvents;
      console.log(eventsToShow);
    }
  }

  return (
    <>
      <div className="homepage-header-wrapper">
        <HeaderAbout
          headlineAbout={headlineAbout}
          subHeadlineAbout={subHeadlineAbout}
        />
        <div className="homepage-stories-button-wrapper">
          <Link to="/past">
            <div className="homepage-stories-button">
              {" "}
              <h1 className="homepage-stories-button-headline">Stories</h1>
            </div>
          </Link>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="all-events-button-wrapper">
          <Link to="/events">
            <button className="all-events-button">show all events</button>
          </Link>
        </div>
        <div className="homepage-random-events-wrapper">
          <div className="random-filter-events-wrapper">
            <label
              htmlFor="random-input"
              className="random-filter-events-label"
            >
              random events in
            </label>
            <input
              className={
                "random-filter-events-input" +
                (eventsToShow === initialRandomEvents
                  ? " filter-not-found"
                  : "")
              }
              name="random-input"
              type="text"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value.toLowerCase());
                handleIsFiltering(e.target.value);
              }}
            />
          </div>
          <div className="events-list-container-homepage">
            {allUpcomingEvents &&
              eventsToShow.map((event) => {
                return (
                  <Link
                    to={`/events/${event.id}`}
                    key={event.id}
                    className="event-card"
                  >
                    <EventCard event={event} className="event-card-component" />
                  </Link>
                );
              })}
          </div>
        </div>
        <UpcomingEvents></UpcomingEvents>
        <PopularEvents></PopularEvents>
      </div>
    </>
  );
}

export default HomePage;
