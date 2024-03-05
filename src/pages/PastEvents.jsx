import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PastEvents.css";
import HeaderAbout from "../components/HeaderAbout";
import NewStoryForm from "../components/NewStoryForm";
import StoriesEventCard from "../components/StoriesEventCard";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);

  const [idIsDisplayed, setIdIsDisplayed] = useState([]);
  const [makeNewStory, setMakeNewStory] = useState(false);
  const [newStoryId, setNewStoryId] = useState(0);
  const [newStoryEvent, setNewStoryEvent] = useState("");

  const currentDate = new Date();
  const currentDateSeconds = currentDate.getTime();

  const headlineAbout = (
    <h1 className="header-about-title">
      Time to share your personal memories!
    </h1>
  );
  const subHeadlineAbout = (
    <h3 className="header-about-subtitle">
      On this page you can find events that have already taken place – 
      read about the experiences of others or <span className="text-focus-span">create your own</span> and share them with the world!
    </h3>
  );

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_lte=${currentDateSeconds}&_sort=date_to_seconds&_order=desc&_embed=stories`
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
    <>
      <div className="homepage-header-wrapper">
        <HeaderAbout
          headlineAbout={headlineAbout}
          subHeadlineAbout={subHeadlineAbout}
        />
        <div className="homepage-stories-button-wrapper">
          <img src="https://static.vecteezy.com/system/resources/previews/009/663/212/original/speech-bubble-talk-bubble-chat-bubble-icon-transparent-free-png.png" className="create-event-button create-story-button "/>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="past-event-all-wrapper">
          {makeNewStory && (
            <NewStoryForm
              setPastEvents={setPastEvents}
              setMakeNewStory={setMakeNewStory}
              idIsDisplayed={idIsDisplayed}
              setIdIsDisplayed={setIdIsDisplayed}
              newStoryId={newStoryId}
              setNewStoryId={setNewStoryId}
              newStoryEvent={newStoryEvent}
              setNewStoryEvent={setNewStoryEvent}
              currentDateSeconds={currentDateSeconds}
            />
          )}
          {pastEvents &&
            pastEvents.map((event) => {
              return (
                <StoriesEventCard
                  key={event.id}
                  event={event}
                  idIsDisplayed={idIsDisplayed}
                  setIdIsDisplayed={setIdIsDisplayed}
                  setMakeNewStory={setMakeNewStory}
                  setNewStoryId={setNewStoryId}
                  setNewStoryEvent={setNewStoryEvent}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default PastEvents;
