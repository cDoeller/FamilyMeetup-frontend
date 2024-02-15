import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "..components/"
import Footer from "../components"
import DatePicker from "react-datepicker"


function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(new Date());
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory]= useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const newEvent= {
      name:name,
      description:description,
      date:date,
      time:time,
      location:location,
      price:price,
      category:category
    };

    axios
      .post(``, newEvent)
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
      <NavBar></NavBar>
      <div className="create-event">
        <form onSubmit={handleSubmit} action="" className="create-form">
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <label htmlFor="">DATE</label>
        <DatePicker selected={date} onChange={(date)=> setDate(date)}></DatePicker>
        <label htmlFor="">TIME</label>
        <input
          type="text"
          name="time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
          value={time}
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
        <label htmlFor="">PRICE</label>
        <input
          type="number"
          name="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
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
      <Footer></Footer>
    
    
    
    </div>

  )
}

export default CreateEvent;
