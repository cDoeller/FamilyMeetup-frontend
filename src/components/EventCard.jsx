import React from "react";
import "../EventCard.css"

function EventCard(props) {
    const {event} = props;
  return (
    <>
      <div className="event-card-image-wrapper">
        <img src={event.image_url} alt="" className="event-card-image" />
      </div>
      <div className="event-card-info-wrapper">
        <h3 className="event-card-title">{event.title}</h3>
        <h3 className="event-card-datetime">{event.date + " " + event.time}</h3>
        <p className="event-card-description">{event.short_description}</p>
      </div>
    </>
  );
}

export default EventCard;
