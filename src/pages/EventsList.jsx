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

  const headlineAbout = "Create, Browse and Filter Events in your area!"
  const subHeadlineAbout = "With familyMeetup you can find events in your area that are child and family friendly. The best thing is that you can be sure to be there with like minded people - connect and have fun!";

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
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
    <div className="page-wrapper">
      <div className="events-list-header-wrapper">
        <HeaderAbout headlineAbout={headlineAbout} subHeadlineAbout={subHeadlineAbout}/>
        <div className="all-events-button-wrapper">
          <Link to="/events/create">
            <button className="create-event-button">Create Event</button>
          </Link>
        </div>
      </div>
      <FilterAllEvents
        eventsToShow={eventsToShow}
        setEventsToShow={setEventsToShow}
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
  );
}

export default EventsList;
