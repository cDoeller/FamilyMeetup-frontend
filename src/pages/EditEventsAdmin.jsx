import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateEvent.css";

function EditEventsAdmin() {
  const [title, setTitle] = useState("");
  const [image_url, setImage] = useState("");
  const [short_description, setShort_description] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState();
  const [date_to_seconds, setDate_to_seconds] = useState();
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        const eventData = response.data;
        setTitle(eventData.title);
        setImage(eventData.image_url);
        setShort_description(eventData.short_description);
        setDescription(eventData.description);
        setDate(eventData.date);
        setTime(eventData.time);
        setLocation(eventData.location);
        setPrice(eventData.price);
        setCategory(eventData.category);
        setParticipants(eventData.participants);
        setDate_to_seconds(eventData.date_to_seconds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateInSeconds = new Date(date).getTime();

    const editedEvent = {
      title,
      image_url,
      short_description,
      description,
      date,
      time,
      location,
      price,
      category,
      participants,
      date_to_seconds: dateInSeconds,
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/events/${eventId}`, editedEvent)
      .then((response) => {
        console.log(response.data);
        alert("The event has been updated successfully!");
        navigate(`/admin`);
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
              setImage(e.target.value.toLowerCase());
            }}
            value={image_url}
          />
          <label>SHORT DESCRIPTION</label>
          <input
            type="text"
            name="short_description"
            onChange={(e) => {
              setShort_description(e.target.value.toLowerCase());
            }}
            value={short_description}
          />
          <label>DESCRIPTION</label>
          <input
            type="text"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value.toLowerCase);
            }}
            value={description}
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
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEventsAdmin;
