import React from "react";
import "../styles/EventDetails.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteButton } from "react-admin";

function EventsDetailAdmin() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [count, setCount] = useState(0);
  const [pageRefresh, setPageRefresh] = useState (false);
  const navigate = useNavigate();

  function DeleteStory(storyId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/stories/${storyId}`)
      .then(() => {
        alert("The story has been removed");
        // force react to update data on screen
        setPageRefresh(!pageRefresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function DeleteEvent() {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
      .then(() => {
        alert("The event has been removed");
        navigate(`/admin`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function increaseCount() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events/${eventId}?_embed=stories`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId, pageRefresh]);

  if (!event)
    return (
      <div>
        <p className="loading">loading..</p>
      </div>
    );
  if (event)
    return (
      <div className="page-wrapper">
        <div className="one-event">
          <div className="event-image">
            <img src={event.image_url} alt="" />
          </div>
          <div className="event-info">
            <div className="event-title-category-wrapper">
              <div className="event-title-short-description-wrapper">
                <h1 className="event-title">{event.title}</h1>
                <h3 className="event-short-description">
                  {event.short_description}
                </h3>
              </div>
              <h3 className="event-category">{event.category}</h3>
            </div>
            <p className="event-description">{event.description}</p>
            <div className="event-date-time-price-wrapper">
              <div className="event-date-time">
                <h3 className="event-date">📅{event.date}</h3>
                <h3 className="event-time">🕒{event.time}</h3>
              </div>
              <h3 className="event-price">{event.price}€</h3>
            </div>
            <h3 className="event-location">{event.location}</h3>
          </div>
          <div className="event-participants-wrapper">
            <div className="event-families-going-join-wrapper">
              <p className="event-families-going">
                {event.participants + count} families are going
              </p>
              <button onClick={increaseCount} className="event-join-button" disabled>
                join event
              </button>
            </div>
            <div className="event-back-button-wrapper">
              <Link to={`/events`}>
                <button className="event-back-button">Back</button>
              </Link>
              <Link to={`/admin/${eventId}/edit`}>
                <button className="event-back-button">Edit</button>
              </Link>
              <button className="event-back-button" onClick={DeleteEvent}>
                Delete
              </button>
            </div>
          </div>
          {/* STORIES */}
          {event.stories.length >= 0 &&
            event.stories.map((story) => {
              return (
                <div key={story.id} className="event-admin-stories-wrapper">
                  <div className="event-admin-stories-info">
                    <h3 className="event-admin-stories-user-name">
                      {story.user_name}
                    </h3>
                    <h3 className="event-admin-stories-text">
                      {story.story_text}
                    </h3>
                  </div>
                  <div className="event-admin-story-delete">
                    <button className="event-back-button" onClick={()=>{DeleteStory(story.id)}}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
}

export default EventsDetailAdmin;
