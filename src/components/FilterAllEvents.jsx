import React, { useState } from "react";

function FilterAllEvents(props) {
  const { eventsToShow, setEventsToShow, allEvents } = props;

  console.log(allEvents);

  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState(0);
  const [price, setPrice] = useState(0);

  // ** idea for filtering on top of filtering
  // ** locationFilterActive, setLocationFilterActive

  const [locationClicked, setLocationClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [participantsClicked, setParticipantsClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [dateTimeClicked, setDateTimeClicked] = useState(false);

  // ** filter the events on click of apply button
  const handleApplyClick = (element) => {
    let filterResult = [];
    // look for specific element
    switch (element) {
      case "location":
        filterResult = allEvents.filter((event) => {
          return event.location.includes(location);
        });
        setLocation("");
        break;
      case "category":
        filterResult = allEvents.filter((event) => {
          return event.category.includes(category);
        });
        setCategory("");
        break;
      case "participants":
        console.log("clicked");
        filterResult = allEvents.filter((event) => {
          return event.participants <= participants;
        });
        setParticipants(0);
        break;
      case "price":
        filterResult = allEvents.filter((event) => {
          return event.price <= price;
        });
        setPrice(0)
        break;
    }
    // check if result available
    if (filterResult.length > 0) {
      setEventsToShow(filterResult);
    } else {
      setEventsToShow([]);
    }
  };

  const handleClick = (element) => {
    if (element === "location" || (element !== "location" && locationClicked)) {
      setLocationClicked(!locationClicked);
    }
    if (element === "category" || (element !== "category" && categoryClicked)) {
      setCategoryClicked(!categoryClicked);
    }
    if (
      element === "participants" || (element !== "participants" && participantsClicked)) {
      setParticipantsClicked(!participantsClicked);
    }
    if (element === "price" || (element !== "price" && priceClicked)) {
      setPriceClicked(!priceClicked);
    }
    if (element === "dateTime" || (element !== "dateTime" && dateTimeClicked)) {
      setDateTimeClicked(!dateTimeClicked);
    }
  };

  // prevent onclick from propagating
  const handlePreventClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="filter-all-events-wrapper">
      <span
        onClick={() => {
          setEventsToShow(allEvents);
        }}
      >
        show all
      </span>
      <span
        onClick={() => {
          handleClick("dateTime");
        }}
      >
        date / time
        {dateTimeClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="text"
              className="all-events-filter-input"
              onChange={(e) => {
                setDateTime(e.target.value);
              }}
              value={dateTime}
            />
            <button
              onClick={() => {
                handleApplyClick("dateTime");
              }}
              className="filter-apply-button"
            >
              Apply
            </button>
          </div>
        )}
      </span>
      <span
        onClick={() => {
          handleClick("location");
        }}
      >
        location
        {locationClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="text"
              className="all-events-filter-input"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              value={location}
            />
            <button
              onClick={() => {
                handleApplyClick("location");
              }}
              className="filter-apply-button"
            >
              Apply
            </button>
          </div>
        )}
      </span>
      <span
        onClick={() => {
          handleClick("category");
        }}
      >
        category
        {categoryClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="text"
              className="all-events-filter-input"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            />
            <button
              onClick={() => {
                handleApplyClick("category");
              }}
              className="filter-apply-button"
            >
              Apply
            </button>
          </div>
        )}
      </span>
      <span
        onClick={() => {
          handleClick("participants");
        }}
      >
        max participants
        {participantsClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="number"
              className="all-events-filter-input"
              onChange={(e) => {
                setParticipants(e.target.value);
              }}
              value={participants}
            />
            <button
              onClick={() => {
                handleApplyClick("participants");
              }}
              className="filter-apply-button"
            >
              Apply
            </button>
          </div>
        )}
      </span>
      <span
        onClick={() => {
          handleClick("price");
        }}
      >
        max price
        {priceClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="number"
              className="all-events-filter-input"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <button
              onClick={() => {
                handleApplyClick("price");
              }}
              className="filter-apply-button"
            >
              Apply
            </button>
          </div>
        )}
      </span>
    </div>
  );
}

export default FilterAllEvents;
