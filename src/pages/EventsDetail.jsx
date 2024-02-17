import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EventsDetail() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [count, setCount] = useState(0);

  function increaseCount() {
   
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5005/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  if (!event)
    return (
      <div>
        <p className="loading">loading..</p>
      </div>
    );
  if (event) 
  return (
  
    <div className="one-event">
      <div className="event-image">
        <img src={event.image_url} alt="" />
      </div>
      <div className="event-info">
        <h1>{event.title}</h1>
        <h2>{event.short_description}</h2>
        <p>{event.description}</p>
        <h3>
          {event.date} {event.time}
        </h3>
        <h3>{event.price}€</h3>
        <h3>{event.location}</h3>
        <h3>{event.category}</h3>
      </div>
      <div className="who-goes">
        <p>{count} families are going</p>
        <button onClick={increaseCount}>JOIN EVENT</button>
      </div>
      <div className="back-button">
        <Link to={`/events`}>
          <button>BACK</button>
        </Link>
      </div>
    </div>
    );
  
}

export default EventsDetail;
