import React from "react";
import "../styles/EventCard.css";

function EventCard(props) {
  const { event } = props;
  return (
    <>
      <div className="event-card-image-wrapper">
        <img src={event.image_url} alt="" className="event-card-image" />
      </div>
      <div className="event-card-info-wrapper">
        <div>
          <h2 className="event-card-title">{event.title}</h2>
          <p className="event-card-description">{event.short_description}</p>
        </div>
        <div className="event-card-datetime">
        <h3 >
        📅 {event.date}
        </h3>
        <h3>
        🕒 {event.time}
        </h3>
        <h3>
        📍 {event.location}
        </h3>
        
        
        </div>
        
      </div>
    </>
  );
}

export default EventCard;
