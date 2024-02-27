import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PastEvents.css";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);

  // load embedded data
  useEffect(() => {
    const currentDate = new Date();
    const currentDateSeconds = currentDate.getTime();
    axios
      .get(
        `http://localhost:5005/events?date_to_seconds_lte=${currentDateSeconds}&_embed=stories`
      )
      .then((response) => {
        setPastEvents(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="past-event-all-wrapper">
        {pastEvents &&
          pastEvents.map((event) => {
            return (
              <div key={event.id} className="past-event-single-wrapper">
                <div className="past-event-card-wrapper">
                  <div className="past-event-image-wrapper">
                    <img src={event.image_url} />
                  </div>
                  <div className="past-event-info-wrapper">
                    <h3 className="past-event-info-title">{event.title}</h3>
                    <h3 className="past-event-info-date">{event.date}</h3>
                    <h3 className="past-event-info-storiecount">{event.stories.length} Stories</h3>
                  </div>
                  <div className="past-event-create-button-wrapper">
                    <button className="past-event-create-button">
                      create story
                    </button>
                  </div>
                </div>
                {event.stories.length > 0 &&
                  event.stories.map((story) => {
                    return (
                      <div
                        key={story.eventId + story.user_name}
                        className="past-event-story-wrapper"
                      >
                        <div className="past-event-story-placeholder"></div>
                        <div className="past-event-story-content">
                          <h3 className="past-event-story-username">
                            {story.user_name}
                          </h3>
                          <p className="past-event-story-text">
                            {story.story_text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PastEvents;
