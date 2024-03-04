import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/FilterAllEvents.css";

// ** TO DO **
// reset clicked when clicked on window

function FilterAllEvents(props) {
  const { eventsToShow, setEventsToShow, todayDateMillis } = props;

  const [date, setDate] = useState(null);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isShowingAll, setIsShowingAll] = useState(true);

  const [locationClicked, setLocationClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);

  const [isFiltering, setIsFiltering] = useState(false);

  const [locationQuery, setLocationQuery] = useState("");
  const allLocations = useRef(null);
  const allCategories = useRef(null);
  const allPrices = useRef(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/events?date_to_seconds_gte=${todayDateMillis}&_sort=date_to_seconds&_order=asc`
      )
      .then((response) => {
        setEventsToShow(response.data);
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
      })
      .then(() => {
        // set price initially to max price
        setPrice(Math.max(...allPrices.current));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // * FILTERING
  useEffect(() => {
    if (isFiltering) {
      let params = new URLSearchParams();
      // filter for date
      if (date) {
        // fold in dropdown when range chosen
        setDateClicked(false);
        // filter events based on dates in milliseconds since 1970
        const startDateSeconds = date[0].getTime();
        const endDateSeconds = date[1].getTime();
        params.append("date_to_seconds_gte", startDateSeconds);
        params.append("date_to_seconds_lte", endDateSeconds);
        setIsShowingAll(false);
      } else {
        // if no date selected, get only results from today onwards
        params.append("date_to_seconds_gte", todayDateMillis);
        params.append("_sort", "date_to_seconds");
        params.append("_order", "asc");
      }
      // filter for location
      if (location.length > 0) setIsShowingAll(false);
      location.forEach((oneLocation) => {
        params.append("location", oneLocation);
      });
      // filter for category
      if (category.length > 0) setIsShowingAll(false);
      category.forEach((oneCategory) => {
        params.append("category", oneCategory);
      });
      // filter for price
      if (price !== null) {
        setIsShowingAll(false);
        params.append("price_lte", price);
      }
      // filter for all
      if (showAll) {
        // reset all filtering and only show upcoming
        setIsShowingAll(true);
        params = new URLSearchParams();
        params.append("date_to_seconds_gte", todayDateMillis);
        params.append("_sort", "date_to_seconds");
        params.append("_order", "asc");
      }
      // if only the price has been reset to max, show all is on
      if (
        price === Math.max(...allPrices.current) &&
        location.length === 0 &&
        category.length === 0 &&
        !date
      ) {
        setIsShowingAll(true);
      }

      axios
        .get(`${import.meta.env.VITE_API_URL}/events?${params.toString()}`)
        .then((response) => {
          setEventsToShow(response.data);
        })
        .then(() => {
          setIsFiltering(false);
          if (showAll) resetAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showAll, location, category, price, date]);

  // * RESET ALL
  const resetAll = () => {
    setDate(null);
    setLocation([]);
    setCategory([]);
    setPrice(Math.max(...allPrices.current));
    setDateClicked(false);
    setLocationClicked(false);
    setCategoryClicked(false);
    setPriceClicked(false);
    setShowAll(false);
  };

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

  // filter the location list
  const filterLocationList = () => {
    let foundLocations = allLocations.current.filter((location) => {
      return location.includes(locationQuery);
    });
    if (foundLocations.length === 0) foundLocations = allLocations.current;
    return foundLocations;
  };

  // ************************* RETURN *************************** //
  return (
    <div className="filter-all-events-wrapper">
      <span
        onClick={() => {
          setIsFiltering(true);
          setShowAll(true);
        }}
        className={
          "filter-span-show-all" +
          (isShowingAll ? " filter-span-show-all-active" : "")
        }
      >
        show all
      </span>
      {/* DATE FILTER */}
      <span
        onClick={() => {
          setIsFiltering(true);
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
            <input
              type="text"
              onChange={(e) => {
                setLocationQuery(e.target.value);
              }}
              className="all-events-filter-location-input"
            />
            {allLocations &&
              filterLocationList().map((oneLocation) => {
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
