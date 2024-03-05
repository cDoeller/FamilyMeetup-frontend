import "../styles/EventsList.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import EventCard from "../components/EventCard";
import HeaderAbout from "../components/HeaderAbout";
import { Link } from "react-router-dom";
import FilterAllEvents from "../components/FilterAllEvents";

function EventsList() {
  //  passed to filter all component --> all fetching done there
  const [eventsToShow, setEventsToShow] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [pagesAmount, setPagesAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const maxPages = 10;

  const allLocations = useRef(null);
  const allCategories = useRef(null);
  const allPrices = useRef(null);

  const todayDate = new Date();
  const todayDateMillis = todayDate.getTime();

  const headlineAbout = (
    <h1 className="header-about-title">
      Browse, Filter and Create family events in your area!
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

  // get + set: -all- locations, all categories, max price, pages for pagination
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_gte=${todayDateMillis}&_sort=date_to_seconds&_order=asc`
      )
      .then((response) => {
        // calculate amount of pages for pagination
        setPagesAmount(calculatePagination(response.data.length, maxPages));
        return response.data;
      })
      .then((response) => {
        setPages(
          Array.from({ length: pagesAmount }, (value, index) => index + 1)
        );
        return response;
      })
      .then((response) => {
        console.log(pages);
        // make array all locations, all categories, prices -once- (useRef)
        allCategories.current = Array.from(
          new Set(
            response.map((event) => {
              return event.category;
            })
          )
        ).sort();
        allLocations.current = Array.from(
          new Set(
            response.map((event) => {
              return event.location;
            })
          )
        ).sort();
        allPrices.current = Array.from(
          new Set(
            response.map((event) => {
              return event.price;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // calculate number of pages
  const calculatePagination = (numAllEvents, numPerPage) => {
    const numOfPages = Math.ceil(numAllEvents / numPerPage);
    return numOfPages;
  };

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
          {/* <FilterAllEvents
            eventsToShow={eventsToShow}
            setEventsToShow={setEventsToShow}
            todayDateMillis={todayDateMillis}
            page={currentPage}
            setPage={setCurrentPage}
            maxPages={maxPages}
            clicked={clicked}
            allLocations={allLocations}
            allCategories={allCategories}
            allPrices={allPrices}
          /> */}
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
          {pages &&
            pages.map((page) => {
              return (
                <h3
                  key={page}
                  className={
                    "events-list-pagination-pagenumber" +
                    (page === currentPage
                      ? " events-list-pagination-pagenumber-current"
                      : "")
                  }
                  onClick={() => {
                    if (currentPage!==page) setCurrentPage(page);
                  }}
                >
                  {page}
                </h3>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default EventsList;
