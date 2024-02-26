import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PastEvents.css";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);

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

  return <div>PastEvents</div>;
}

export default PastEvents;
