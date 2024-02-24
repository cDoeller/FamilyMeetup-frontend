import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/FilterAllEvents.css";

// ** TO DO **
// reset clicked when clicked on window
// price always filters with 0, no reset
// easy date input test
// date filter
// controlled / uncontrolled warning

function FilterAllEvents(props) {
  const { eventsToShow, setEventsToShow } = props;

  const [date, setDate] = useState(null);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const [locationClicked, setLocationClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);

  const [isFiltering, setIsFiltering] = useState(false);

  const allLocations = useRef(null);
  const allCategories = useRef(null);
  const allPrices = useRef(null);

  // * INITIAL get request for all events
  // * listing all categories and locations
  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setEventsToShow(response.data);
        console.log(response.data);
        return response.data;
      })
      .then((response) => {
        // make array all locations, all categories, prices -once- (useRef)
        allCategories.current = Array.from(
          new Set(
            response.map((event) => {
              return event.category;
            })
          )
        ).sort();
        allLocations.current = Array.from(
          new Set(
            response.map((event) => {
              return event.location;
            })
          )
        ).sort();
        allPrices.current = Array.from(
          new Set(
            response.map((event) => {
              return event.price;
            })
          )
        );
        // set price initially to max price
        setPrice(Math.max(...allPrices.current));
        console.log("mounted");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // * FILTERING
  useEffect(() => {
    if (isFiltering) {
      let params = new URLSearchParams();
      // filter for location
      if (location.length > 0)
        location.forEach((oneLocation) => {
          params.append("location", oneLocation);
        });
      // filter for category
      if (category.length > 0)
        category.forEach((oneCategory) => {
          params.append("category", oneCategory);
        });
      // filter for price
      if (price !== null) {
        params.append("price_lte", price);
      }
      // filter for all
      if (showAll) params = "";
      axios
        .get(`http://localhost:5005/events?${params.toString()}`)
        .then((response) => {
          setEventsToShow(response.data);
        })
        .then(() => {
          setIsFiltering(false);
          if (showAll) setShowAll(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showAll, location, category, price]);

  // * CHECKBOX HANDELING
  const handleChechboxChange = (e) => {
    setIsFiltering(true);
    if (e.target.checked) {
      if (e.target.name === "category") {
        setCategory([...category, e.target.value]);
      }
      if (e.target.name === "location") {
        setLocation([...location, e.target.value]);
      }
    } else {
      if (e.target.name === "category")
        setCategory(
          category.filter((element) => {
            return element !== e.target.value;
          })
        );
      if (e.target.name === "location")
        setLocation(
          location.filter((element) => {
            return element !== e.target.value;
          })
        );
    }
  };

  // * date filter
  useEffect(() => {
    if (date) {
      // fold in dropdown when range chosen
      setDateClicked(!dateClicked);
      // filter events based on dates in milliseconds
      const startDate = date[0];
      const endDate = date[1];
      const filteredEventsDates = eventsToShow.filter((event) => {
        const dateToCheck = new Date(event.date);
        return isBetween(dateToCheck, startDate, endDate);
      });
      // update events to show
      setEventsToShow(filteredEventsDates);
      // reset date
      setDate(null);
    }
  }, [date]);

  // *** Date filtering - helper function
  const isBetween = (dateToCheck, startDate, endDate) => {
    return (
      dateToCheck.getTime() >= startDate.getTime() &&
      dateToCheck.getTime() <= endDate.getTime()
    );
  };

  // handle click show behavior
  const handleClick = (element) => {
    if (element === "location" || (element !== "location" && locationClicked)) {
      setLocationClicked(!locationClicked);
    }
    if (element === "category" || (element !== "category" && categoryClicked)) {
      setCategoryClicked(!categoryClicked);
    }
    if (element === "price" || (element !== "price" && priceClicked)) {
      setPriceClicked(!priceClicked);
    }
    if (element === "date" || (element !== "date" && dateClicked)) {
      setDateClicked(!dateClicked);
    }
  };
  // prevent onclick from propagating
  const handlePreventClick = (e) => {
    e.stopPropagation();
  };

  // ************************* RETURN *************************** //
  return (
    <div className="filter-all-events-wrapper">
      <span
        onClick={() => {
          setIsFiltering(true);
          setShowAll(true);
        }}
      >
        show all
      </span>
      {/* DATE FILTER */}
      <span
        onClick={() => {
          handleClick("date");
        }}
      >
        date
        {dateClicked && (
          <div className="date-picker-custom" onClick={handlePreventClick}>
            <Calendar
              onChange={(e) => {
                setDate(e);
              }}
              value={date}
              selectRange={true}
              minDate={new Date()}
            />
          </div>
        )}
      </span>
      {/* LOCATION FILTER */}
      <span
        onClick={() => {
          handleClick("location");
        }}
      >
        location
        {locationClicked && (
          <div
            onClick={handlePreventClick}
            className="all-events-filter-popup checkbox-filtering"
          >
            {allLocations &&
              allLocations.current.map((oneLocation) => {
                return (
                  <span key={oneLocation} className="checkbox-label-span">
                    <input
                      checked={location.includes(oneLocation)}
                      onClick={handlePreventClick}
                      name="location"
                      value={oneLocation}
                      onChange={handleChechboxChange}
                      type="checkbox"
                    />
                    <label
                      className="all-events-filter-checkbox-label"
                      htmlFor={oneLocation}
                    >
                      {oneLocation}
                    </label>
                  </span>
                );
              })}
          </div>
        )}
      </span>
      {/* CATEGORY FILTER */}
      <span
        onClick={() => {
          handleClick("category");
        }}
      >
        category
        {categoryClicked && (
          <div
            onClick={handlePreventClick}
            className="all-events-filter-popup checkbox-filtering"
          >
            {allCategories &&
              allCategories.current.map((oneCategory) => {
                return (
                  <span key={oneCategory} className="checkbox-label-span">
                    <input
                      checked={category.includes(oneCategory)}
                      onClick={handlePreventClick}
                      name="category"
                      onChange={handleChechboxChange}
                      type="checkbox"
                      value={oneCategory}
                    />
                    <label
                      className="all-events-filter-checkbox-label"
                      htmlFor={oneCategory}
                    >
                      {oneCategory}
                    </label>
                  </span>
                );
              })}
          </div>
        )}
      </span>
      {/* PRICE FILTER */}
      <span
        onClick={() => {
          handleClick("price");
        }}
      >
        max price
        {priceClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="range"
              name="price-slider"
              className="all-events-filter-input"
              min="0"
              max={Math.max(...allPrices.current)}
              onChange={(e) => {
                setIsFiltering(true);
                setPrice(Math.abs(e.target.value));
              }}
              value={price}
            />
            <label htmlFor="price-slider">
              {price === 0 ? "free" : price + " €"}
            </label>
          </div>
        )}
      </span>
    </div>
  );
}

export default FilterAllEvents;
