import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker'


function CreateEvent() {
  const [title, setTitle] = useState("");
  const [image, setImage] =useState("")
  const [short_description, setShort_description]= useState("")
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory]= useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const newEvent= {
      title:title,
      image:image,
      short_description: short_description,
      description:description,
      date:date,
      location:location,
      price:price,
      category:category
    };

    axios
      .post(`http://localhost:5005/events/create`, newEvent)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate(`/events`);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div>
      <div className="create-event">
        <form onSubmit={handleSubmit} action="" className="create-form">
        <label htmlFor="">TITLE</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label htmlFor="">IMAGE</label>
        <input
          placeholder="URL"
          type="text"
          name="image_url"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
        />
        <label htmlFor="">SHORT DESCRIPTION</label>
        <input
          type="text"
          name="short_description"
          onChange={(e) => {
            setShort_description(e.target.value);
          }}
          value={short_description}
        />
        <label htmlFor="">DESCRIPTION</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <label htmlFor="">DATE & TIME</label>
        <DatePicker selected={date} onChange={(date)=> setDate(date)}></DatePicker>
       <TimePicker/>
        <label htmlFor="">PRICE</label>
        <input
          placeholder="€"
          type="number"
          name="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <label htmlFor="">LOCATION</label>
        <input
          type="text"
          name="location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
        />
        <label htmlFor="">CATEGORY</label>
        <input
          type="text"
          name="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        />
        <button type="submit">Create Event</button>
        </form>
      </div>
    </div>

  )
}

export default CreateEvent;
