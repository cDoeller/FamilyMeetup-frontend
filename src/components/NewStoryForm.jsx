import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/NewStoryForm.css"

function NewStoryForm(props) {
  const {
    setPastEvents,
    setMakeNewStory,
    idIsDisplayed,
    setIdIsDisplayed,
    newStoryId,
    newStoryEvent,
    currentDateSeconds,
  } = props;

  const [newStoryUser, setNewStoryUser] = useState("");
  const [newStoryText, setNewStoryText] = useState("");

  // submit new story
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStory = {
      eventId: newStoryId,
      user_name: newStoryUser,
      story_text: newStoryText,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/stories`, newStory)
      .then(() => {
        axios
          .get(
            `${import.meta.env.VITE_API_URL}/events?date_to_seconds_lte=${currentDateSeconds}&_sort=date_to_seconds&_order=desc&_embed=stories`
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

  return (
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
          <textarea
            type="text"
            className="past-event-new-story-form-input past-event-new-story-form-textarea"
            onChange={(e) => {
              setNewStoryText(e.target.value);
            }}
            required
          />
          <button type="submit" className="past-event-new-story-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewStoryForm;
