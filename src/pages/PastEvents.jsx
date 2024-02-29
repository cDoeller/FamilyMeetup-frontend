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

  const headlineAbout = "Create your personal stories!";
  const subHeadlineAbout =
    "Browse through events that have already happened, read about the experiences of others and add your very personal story!";

  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/events?date_to_seconds_lte=${currentDateSeconds}&_sort=date_to_seconds&_order=desc&_embed=stories`
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
      <div className="homepage-header-wrapper">
        <HeaderAbout
          headlineAbout={headlineAbout}
          subHeadlineAbout={subHeadlineAbout}
        />
      </div>
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
  );
}

export default PastEvents;
