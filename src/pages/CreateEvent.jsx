import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "../components/CreateEvent.css";

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
  const [participants, setParticipants]= useState(0)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: title,
      image: image_url,
      short_description: short_description,
      description: description,
      date: date,
      time: time,
      location: location,
      price: price,
      category: category,
      participants: participants,
    };

    axios
    .post(`http://localhost:5005/events`, newEvent)
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
              setTitle(e.target.value);
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
          <input
            type="text"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <label>DATE</label>
          <input
            placeholder="dd/mm/yyyy"
            type="text"
            name="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
          {/*<DatePicker
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></DatePicker>*/}
          <label>TIME</label>
          <input
            placeholder="hh:mm"
            type="text"
            name="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
          />
          {/*<TimePicker
          format="HH : mm"
          className="time-picker"
          onChange={(e) => {
            setTime(e.target.value);
          }}
          value={time}
          clockIcon={null}
          clearIcon="X"
        />*/}

          <label>PRICE</label>
          <input
            placeholder="€"
            type="number"
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />
          <label>LOCATION</label>
          <input
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
          />
          <label>CATEGORY</label>
          <input
            type="text"
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          />
          <button className="submit" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
