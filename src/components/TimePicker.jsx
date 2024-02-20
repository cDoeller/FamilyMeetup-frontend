import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = () => {
  const [time, setTime] = useState(null);

  const handleTimeChange = (time) => {
    setTime(time);
  };

  return (
    <div>
      <h2>Time Picker</h2>
      <DatePicker
        selected={time}
        onChange={handleTimeChange}
        showtime
        showtimeOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
};

export default TimePicker;
