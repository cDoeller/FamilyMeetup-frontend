import React from "react";
import "../styles/EventDetails.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EventsDetail() {
  const [event, setEvent] = useState(null);
  const [hasJoined, setHasJoined] = useState(false)
  const { eventId } = useParams();
  const [count, setCount] = useState(0);
  const [participants, setParticipants] = useState();
  useEffect(()=>{
if(event){
      const updatedEvent = {
        title: event.title,
        image_url: event.image_url,
        short_description: event.short_description,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        category: event.category,
        participants: event.participants+count,
        date_to_seconds: event.date_to_seconds
      }
      axios.
      put(`http://localhost:5005/events/${eventId}`, updatedEvent)
      .then((response)=>{
       console.log(response.data)
      })
      .catch((err) => {
       console.log(err);
     });}

  },[count])
  
 
  function increaseCount() {
    setHasJoined(true)
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
                <h3 className="event-date">{event.date}</h3>
                <h3 className="event-time">{event.time}</h3>
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
              <button onClick={increaseCount} disabled={hasJoined} className="event-join-button">
                join event
              </button>
            </div>
            <div className="event-back-button-wrapper">
              <Link to={`/events`}>
                <button className="event-back-button">back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EventsDetail;

