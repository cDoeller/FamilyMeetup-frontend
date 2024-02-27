import React from "react";
import "../styles/StoriesEventCard.css"

function StoriesEventCard(props) {
  const {
    event,
    setIdIsDisplayed,
    idIsDisplayed,
    setMakeNewStory,
    setNewStoryId,
    setNewStoryEvent,
  } = props;

  // show stories or not
  const handleShowStories = (id) => {
    // close if included
    if (idIsDisplayed.includes(id)) {
      const updateDisplayed = idIsDisplayed.filter((oneId) => {
        return oneId !== id;
      });
      setIdIsDisplayed(updateDisplayed);
    } else {
      // add otherwise
      setIdIsDisplayed([...idIsDisplayed, id]);
    }
  };

  return (
    <div className="past-event-single-wrapper">
      <div className="past-event-card-wrapper">
        <div className="past-event-image-wrapper">
          <img src={event.image_url} />
        </div>
        <div className="past-event-info-wrapper">
          <div className="past-event-info-wrapper-top">
            <h3 className="past-event-ƒinfo-title">{event.title}</h3>
            <h3 className="past-event-info-date">{event.date}</h3>
          </div>
          <h3
            className="past-event-info-storiecount"
            onClick={() => {
              handleShowStories(event.id);
            }}
          >
            {idIsDisplayed.includes(event.id) ? (
              <span className="past-event-info-storiecount-arrow rotate-90">
                ▸
              </span>
            ) : (
              <span className="past-event-info-storiecount-arrow">▸</span>
            )}
            {" " + event.stories.length + " "}
            Stories
          </h3>
        </div>
        <div className="past-event-create-button-wrapper">
          <button
            className="past-event-create-button"
            onClick={() => {
              setMakeNewStory(true);
              setNewStoryId(event.id);
              setNewStoryEvent(event.title);
            }}
          >
            create story
          </button>
        </div>
      </div>
      {event.stories.length > 0 &&
        idIsDisplayed.includes(event.id) &&
        event.stories.map((story) => {
          return (
            <div
              key={story.eventId + story.user_name}
              className="past-event-story-wrapper"
            >
              <div className="past-event-story-placeholder"></div>
              <div className="past-event-story-content">
                <h3 className="past-event-story-username">{story.user_name}</h3>
                <p className="past-event-story-text">{story.story_text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default StoriesEventCard;
