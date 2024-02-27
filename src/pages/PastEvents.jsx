import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PastEvents.css";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);
  // array for id that should display stories
  const [idIsDisplayed, setIdIsDisplayed] = useState([]);

  const [makeNewStory, setMakeNewStory] = useState(false);
  const [newStoryId, setNewStoryId] = useState(0);
  const [newStoryEvent, setNewStoryEvent] = useState("");
  const [newStoryUser, setNewStoryUser] = useState("");
  const [newStoryText, setNewStoryText] = useState("");

  const currentDate = new Date();
  const currentDateSeconds = currentDate.getTime();

  // load embedded data
  useEffect(() => {
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

  // submit new story
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStory = {
      eventId: newStoryId,
      user_name: newStoryUser,
      story_text: newStoryText,
    };
    axios
      .post(`http://localhost:5005/stories`, newStory)
      .then(() => {
        axios
          .get(
            `http://localhost:5005/events?date_to_seconds_lte=${currentDateSeconds}&_embed=stories`
          )
          .then((response) => {
            setPastEvents(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        // close window create
        setMakeNewStory(false);
        // open up fold of event added story
        if (!idIsDisplayed.includes(newStoryId))
          setIdIsDisplayed([...idIsDisplayed, newStoryId]);
        // reset input states
        setNewStoryUser("");
        setNewStoryText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="page-wrapper">
      <div className="past-event-all-wrapper">
        {makeNewStory && (
          <div className="past-event-new-story-wrapper">
            <div className="past-event-new-story-inner">
              <form
                action=""
                onSubmit={handleSubmit}
                className="past-event-new-story-form"
              >
                <p
                  className="past-event-new-story-form-x"
                  onClick={() => {
                    setMakeNewStory(false);
                  }}
                >
                  x
                </p>
                <h3 className="past-event-new-story-form-h3">
                  Create your Story for{" "}
                  <span className="past-event-new-story-form-h3-span">
                    {newStoryEvent}
                  </span>
                </h3>
                <label htmlFor="" className="past-event-new-story-form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="past-event-new-story-form-input"
                  onChange={(e) => {
                    setNewStoryUser(e.target.value);
                  }}
                  required
                />
                <label htmlFor="" className="past-event-new-story-form-label">
                  Your Story
                </label>
                <input
                  type="textarea"
                  className="past-event-new-story-form-input"
                  onChange={(e) => {
                    setNewStoryText(e.target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  className="past-event-new-story-form-button"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {pastEvents &&
          pastEvents.map((event) => {
            return (
              <div key={event.id} className="past-event-single-wrapper">
                <div className="past-event-card-wrapper">
                  <div className="past-event-image-wrapper">
                    <img src={event.image_url} />
                  </div>
                  <div className="past-event-info-wrapper">
                    <div className="past-event-info-wrapper-top">
                      <h3 className="past-event-info-title">{event.title}</h3>
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
                        <span className="past-event-info-storiecount-arrow">
                          ▸
                        </span>
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
