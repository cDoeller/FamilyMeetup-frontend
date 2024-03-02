import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateEvent.css";
function CreateEvent() {
  const [title, setTitle] = useState("");
  const [image_url, setImage] = useState("");
  const [short_description, setShort_description] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState(0);
  const [date_to_seconds, setDate_to_seconds] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateInSeconds = new Date(date).getTime();
    const newEvent = {
      title: title,
      image_url: image_url,
      short_description: short_description,
      description: description,
      date: date,
      time: time,
      location: location,
      price: price,
      category: category,
      participants: participants,
      date_to_seconds: dateInSeconds,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/events`, newEvent)
      .then((response) => {
        console.log(response.data);
        alert("The event has been created succesfully!");
        navigate(`/events`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="create">
        <form onSubmit={handleSubmit} action="" className="form">
          <label>TITLE</label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setTitle(e.target.value.toLowerCase());
            }}
            value={title}
          />
          <label>IMAGE</label>
          <input
            placeholder="URL"
            type="text"
            name="image_url"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image_url}
          />
          <label>SHORT DESCRIPTION</label>
          <input
            type="text"
            name="short_description"
            onChange={(e) => {
              setShort_description(e.target.value);
            }}
            value={short_description}
          />
          <label>DESCRIPTION</label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="create-event-textarea"
          />
          <label>DATE</label>
          <input
            placeholder="dd/mm/yyyy"
            type="date"
            name="date"
            min={new Date().toJSON().slice(0, 10)}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />

          <label>TIME</label>
          <input
            placeholder="hh:mm"
            type="time"
            name="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
          />
          <label>PRICE</label>
          <input
            placeholder="€"
            type="number"
            name="price"
            onChange={(e) => {
              setPrice(Math.abs(e.target.value));
            }}
            value={price}
          />
          <label>LOCATION</label>
          <input
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value.toLowerCase());
            }}
            value={location}
          />
          <label>CATEGORY</label>
          <select
            className="dropdown"
            id="dropdown"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value.toLowerCase());
          
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="adventure">Adventure</option>
            <option value="art">Art</option>
            <option value="cooking">Cooking</option>
            <option value="nature">Nature</option>
            <option value="learn">Learn</option>
            <option value="relax">Relax</option>
            <option value="sport">Sport</option>
            <option value="travelling">Travelling</option>
          </select>

          <button className="submit" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
