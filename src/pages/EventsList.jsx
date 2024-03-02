import "../styles/EventsList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import HeaderAbout from "../components/HeaderAbout";
import { Link } from "react-router-dom";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  const [eventsToShow, setEventsToShow] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  const todayDate = new Date();
  const todayDateMillis = todayDate.getTime();

  const headlineAbout = "Create, Browse and Filter Events in your area!";
  const subHeadlineAbout =
    "With familyMeetup you can find events in your area that are child and family friendly. The best thing is that you can be sure to be there with like minded people - connect and have fun!";

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_gte=${todayDateMillis}`
      )
      .then((response) => {
        // console.log(response.data);
        setAllEvents(response.data);
        setEventsToShow(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="homepage-header-wrapper">
        <HeaderAbout
          headlineAbout={headlineAbout}
          subHeadlineAbout={subHeadlineAbout}
        />
        <div className="homepage-stories-button-wrapper">
          <Link to="/events/create">
            <button className="create-event-button">Create Event</button>
          </Link>
        </div>
      </div>
      <div className="page-wrapper">
        <FilterAllEvents
          eventsToShow={eventsToShow}
          setEventsToShow={setEventsToShow}
          todayDateMillis={todayDateMillis}
        />
        <div className="events-list-container-eventslistpage">
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
    </>
  );
}

export default EventsList;
