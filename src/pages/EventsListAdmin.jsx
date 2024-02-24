import "../styles/EventsList.css";
import "../styles/HomePage.css";
import "../styles/EventsListAdmin.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

function EventsListAdmin() {
  const [allEvents, setAllEvents] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setAllEvents(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleIsFiltering(input) {
    if (input === "") {
      setIsFiltering(false);
    } else {
      setIsFiltering(true);
    }
  }

  let eventsToShow = null;
  if (allEvents) {
    // if a filter title is available, show filtered
    // else, show all events
    if (isFiltering) {
      eventsToShow = allEvents.filter((event) => {
        return event.title.toLowerCase().startsWith(titleFilter);
      });
    }
    // in case not filtering and no result found, show all
    if (!eventsToShow) eventsToShow = allEvents;
  }

  const handleSubmit = (e) => {
    // console.log(userName, pwd);
    e.preventDefault();
    const backendLogin = {};
    axios
      .get("http://localhost:5005/logins")
      .then((response) => {
        // console.log(response.data)
        backendLogin.user = response.data[0].user;
        backendLogin.pwd = response.data[0].pwd;
      })
      .then(() => {
        if (userName === backendLogin.user && pwd === backendLogin.pwd) {
          setIsLoggedIn(true);
        } else {
          alert("wrong username or password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // reset
    setUserName("");
    setPwd("");
  };

  // *********************** RETURN *************************
  if (!isLoggedIn)
    return (
      <div className="page-wrapper">
        <form
          action=""
          onSubmit={handleSubmit}
          className="admin-eventlist-login-form"
        >
          <label htmlFor="user" className="admin-eventlist-label">
            User Name
          </label>
          <input
            type="text"
            name="user"
            className="admin-eventlist-input"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
          <label htmlFor="pwd" className="admin-eventlist-label">
            Password
          </label>
          <input
            type="password"
            name="pwd"
            className="admin-eventlist-input"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            required
          />
          <button type="submit" className="admin-eventlist-login-button">
            login
          </button>
        </form>
      </div>
    );

  // conditional render
  if (isLoggedIn)
    return (
      <div className="page-wrapper">
        <div
          className="random-filter-events-wrapper"
          style={{ marginTop: "3rem" }}
        >
          <label htmlFor="title-input" className="random-filter-events-label">
            event title
          </label>
          <input
            className="random-filter-events-input"
            name="title-input"
            type="text"
            value={titleFilter}
            onChange={(e) => {
              setTitleFilter(e.target.value);
              handleIsFiltering(e.target.value);
            }}
          />
        </div>
        <div
          className="events-list-container-eventslistpage"
          style={{ marginTop: "1rem" }}
        >
          {allEvents &&
            eventsToShow.map((event) => {
              return (
                <Link
                  to={`/admin/${event.id}`}
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

export default EventsListAdmin;
