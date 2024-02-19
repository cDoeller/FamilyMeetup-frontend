import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "../FilterAllEvents.css";

// ** TO DO **
// reset clicked when clicked on window
// date time picker drowdown
// category / location list --> sort by name / checkbox filtering?
// multi aspect filtering

function FilterAllEvents(props) {
  const { eventsToShow, setEventsToShow, allEvents } = props;
  console.log(allEvents);

  // array for all locations and categories (lists)
  let allLocations = null;
  let allCategories = null;
  if (allEvents) {
    allCategories = Array.from(
      new Set(
        allEvents.map((event) => {
          return event.category;
        })
      )
    );
    allLocations = Array.from(
      new Set(
        allEvents.map((event) => {
          return event.location;
        })
      )
    );
    console.log(allCategories);
    console.log(allLocations);
  }

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

  // handle click show behavior
  const handleClick = (element) => {
    if (element === "location" || (element !== "location" && locationClicked)) {
      setLocationClicked(!locationClicked);
    }
    if (element === "category" || (element !== "category" && categoryClicked)) {
      setCategoryClicked(!categoryClicked);
    }
    if (
      element === "participants" ||
      (element !== "participants" && participantsClicked)
    ) {
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

  // ** filter the events on click of apply button
  const handleApplyClick = (element) => {
    let filterResult = [];
    // look for specific element
    switch (element) {
      // case "location":
      //   filterResult = allEvents.filter((event) => {
      //     return event.location.includes(location);
      //   });
      //   setLocation("");
      //   break;
      // case "category":
      //   filterResult = allEvents.filter((event) => {
      //     return event.category.includes(category);
      //   });
      //   setCategory("");
      //   break;
      case "participants":
        console.log("clicked");
        filterResult = allEvents.filter((event) => {
          return event.participants <= participants;
        });
        setParticipants(0);
        setParticipantsClicked(!participantsClicked);
        break;
      case "price":
        filterResult = allEvents.filter((event) => {
          return event.price <= price;
        });
        setPrice(0);
        setPriceClicked(!priceClicked);
        break;
    }
    // check if result available
    if (filterResult.length > 0) {
      setEventsToShow(filterResult);
    } else {
      setEventsToShow([]);
    }
  };

  // ** NEW -- click on location filter list dropdown
  // --> sort by name
  const handleFilterClick = (e) => {
    const filterVal = e.target.innerHTML.slice(2); // get rid of pointing hand
    let filterResult = "";
    if (allLocations.includes(filterVal)) {
      filterResult = allEvents.filter((event) => {
        return event.location.includes(filterVal);
      });
      setLocation("");
      setLocationClicked(false);
    }
    if (allCategories.includes(filterVal)) {
      filterResult = allEvents.filter((event) => {
        return event.category.includes(filterVal);
      });
      setCategory("");
      setCategoryClicked(false);
    }
    if (filterResult !== "") setEventsToShow(filterResult);
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
        {/* WORK IN PROGRESS */}
        {dateTimeClicked && (
          <DateTimePicker
            onClick={handlePreventClick}
            label="Basic date time picker"
            className="date-time-picker"
          />
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
            <ul className="all-events-filter-location-ul">
              {allLocations &&
                allLocations.map((location) => {
                  return (
                    <li
                      key={location}
                      onClick={handleFilterClick}
                      className="all-events-filter-location-li"
                    >
                      ☞ {location}
                    </li>
                  );
                })}
            </ul>
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
            <ul className="all-events-filter-location-ul">
              {allCategories &&
                allCategories.map((category) => {
                  return (
                    <li
                      key={category}
                      onClick={handleFilterClick}
                      className="all-events-filter-location-li"
                    >
                      ☞ {category}
                    </li>
                  );
                })}
            </ul>
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
        max price [€]
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

{
  /* <input
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
</button> */
}

// <input
// type="text"
// className="all-events-filter-input"
// onChange={(e) => {
//   setCategory(e.target.value);
// }}
// value={category}
// />
// <button
// onClick={() => {
//   handleApplyClick("category");
// }}
// className="filter-apply-button"
// >
// Apply
// </button>

// <input
// type="text"
// className="all-events-filter-input"
// onChange={(e) => {
//   setDateTime(e.target.value);
// }}
// value={dateTime}
// />
// <button
// onClick={() => {
//   handleApplyClick("dateTime");
// }}
// className="filter-apply-button"
// >
// Apply
// </button>
