import "../styles/EventsList.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import EventCard from "../components/EventCard";
import HeaderAbout from "../components/HeaderAbout";
import { Link } from "react-router-dom";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  const [eventsToShow, setEventsToShow] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);

  const allLocations = useRef(null);
  const allCategories = useRef(null);
  const allPrices = useRef(null);

  const todayDate = new Date();
  const todayDateMillis = todayDate.getTime();

  const headlineAbout = (
    <h1 className="header-about-title">
      Browse, filter and create family events in your area!
    </h1>
  );
  const subHeadlineAbout = (
    <h3 className="header-about-subtitle">
      With this tool you can browse through all upcoming events and find the
      right one for you and your family. Use the filters and dropdown menus in
      the <span className="text-focus-span">search bar</span>. Click on the{" "}
      <span className="text-focus-span">button</span> on the right to create an
      event yourself and share it with others!
    </h3>
  );

  // useRef for: locations, categories, prices
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_gte=${todayDateMillis}&_sort=date_to_seconds&_order=asc`
      )
      .then((response) => {
        // make array all locations, all categories, prices -once- (useRef)
        allCategories.current = Array.from(
          new Set(
            response.data.map((event) => {
              return event.category;
            })
          )
        ).sort();
        allLocations.current = Array.from(
          new Set(
            response.data.map((event) => {
              return event.location;
            })
          )
        ).sort();
        allPrices.current = Array.from(
          new Set(
            response.data.map((event) => {
              return event.price;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setClicked(!clicked);
        }}
      >
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
            setEventsToShow={setEventsToShow}
            todayDateMillis={todayDateMillis}
            clicked={clicked}
            allLocations={allLocations}
            allCategories={allCategories}
            allPrices={allPrices}
            setNext={setNext}
            setPrev={setPrev}
            nextClicked={nextClicked}
            prevClicked={prevClicked}
            setNextClicked={setNextClicked}
            setPrevClicked={setPrevClicked}
          />
          <div className="events-list-container-eventslistpage">
            {eventsToShow &&
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
        <div className="events-list-pagination">
          {prev ? (
            <h3
              onClick={() => {
                setPrevClicked(true);
              }}
              className="events-list-pagination-link"
            >
              {"<"}
            </h3>
          ) : (
            <h3 className="events-list-pagination-link-inactive">{"<"}</h3>
          )}
          {next ? (
            <h3
              onClick={() => {
                setNextClicked(true);
              }}
              className="events-list-pagination-link"
            >
              {">"}
            </h3>
          ) : (
            <h3 className="events-list-pagination-link-inactive">{">"}</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default EventsList;
