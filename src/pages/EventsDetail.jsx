import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function EventsDetail() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [count, setCount]= useState(0)

  function increaseCount(){
  setCount(prevCount => prevCount + 1)
  setCount((prevCount)=>{return prevCount + 1})

  }
  useEffect(() => {
    axios
      .get()
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
        <NavBar />
        <p className="loading">loading..</p>
      </div>
    );
  if (event)
   return 
    <>
    <NavBar/>
    <div className="one-event">
      <div className="event-image">
        <img src={event.image_url} alt=""/>
      </div>
      <div className="event-info">
        <h1>{event.name}</h1>
        <p>{event.description}</p>
        <h3>{event.date} {event.time}</h3>
        <h3>{event.price}</h3>
        <h3>{event.location}</h3>
      </div>
      <div className="who-goes">
        <p>{count} families are going</p>
        <button onClick={increaseCount}>JOIN EVENT</button>
      </div>
      <div className="back-button">
        <Link to={`/events`}><button>BACK</button></Link>
      </div>
    </div>
    <Footer></Footer>
    </>;
}

export default EventsDetail;
