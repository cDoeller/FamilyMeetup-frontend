import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/FilterAllEvents.css";

// ** TO DO **
// reset clicked when clicked on window

function FilterAllEvents(props) {
  const {
    eventsToShow,
    setEventsToShow,
    todayDateMillis,
    clicked,
    allLocations,
    allCategories,
    allPrices,
    setNext,
    setPrev,
    nextClicked,
    setNextClicked,
    prevClicked,
    setPrevClicked,
  } = props;

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

  const [linkHeaderString, setLinkHeaderString] = useState("");
  const [linkHeaderObject, setLinkHeaderObject] = useState("");

  // initially show all events with pagination
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/events?date_to_seconds_gte=${todayDateMillis}&_sort=date_to_seconds&_order=asc&_page=1&_per_page=10`
      )
      .then((response) => {
        setEventsToShow(response.data);
        setLinkHeaderString(response.headers.link);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (linkHeaderString) {
      linkHeaderString.includes("next") ? setNext(true) : setNext(false);
      linkHeaderString.includes("prev") ? setPrev(true) : setPrev(false);
      setLinkHeaderObject(parseLinkHeader(linkHeaderString));
    }
  }, [linkHeaderString]);

  function parseLinkHeader(linkHeader) {
    const linkHeadersArray = linkHeader
      .split(", ")
      .map((header) => header.split("; "));
    const linkHeadersMap = linkHeadersArray.map((header) => {
      const thisHeaderRel = header[1].replace("rel=", "").replace(/['"]+/g, "");
      const thisHeaderUrl = "https" + header[0].slice(5, -1);
      return [thisHeaderRel, thisHeaderUrl];
    });
    return Object.fromEntries(linkHeadersMap);
  }

  useEffect(() => {
    if (prevClicked)
      axios
        .get(`${linkHeaderObject.prev}`)
        .then((response) => {
          setEventsToShow(response.data);
          setLinkHeaderString(response.headers.link);
          setPrevClicked(false);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });
  }, [prevClicked]);

  useEffect(() => {
    if (nextClicked) {
      axios
        .get(`${linkHeaderObject.next}`)
        .then((response) => {
          setEventsToShow(response.data);
          setLinkHeaderString(response.headers.link);
          setNextClicked(false);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [nextClicked]);

  // set price initially to max price
  useEffect(() => {
    if (allPrices.current) setPrice(Math.max(...allPrices.current));
  }, [allPrices.current]);

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
      // Pagination
      params.append("_page", "1");
      params.append("_per_page", "10");
      // final axios call
      axios
        .get(`${import.meta.env.VITE_API_URL}/events?${params.toString()}`)
        .then((response) => {
          setEventsToShow(response.data);
          // if header is gotten back (only if more than 1 page)
          if (response.headers.link) {
            setLinkHeaderString(response.headers.link);
          } else {
            // else disable pagination
            setNext(false);
            setPrev(false);
          }
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

  // ** handle dropdown behavior
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
  // remove dropdowns when clicked somewhere in window
  useEffect(() => {
    if (locationClicked) setLocationClicked(!locationClicked);
    if (categoryClicked) setCategoryClicked(!categoryClicked);
    if (priceClicked) setPriceClicked(!priceClicked);
    if (dateClicked) setDateClicked(!dateClicked);
  }, [clicked]);

  //  ** filter the location list
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
        onClick={(e) => {
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
        onClick={(e) => {
          setIsFiltering(true);
          handleClick("date");
          handlePreventClick(e);
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
              locale="en-GB"
            />
          </div>
        )}
      </span>
      {/* LOCATION FILTER */}
      <span
        onClick={(e) => {
          handleClick("location");
          handlePreventClick(e);
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
              className={
                "all-events-filter-location-input" +
                (allLocations.current.length === filterLocationList().length
                  ? " filter-not-found"
                  : "")
              }
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
                      className="all-events-filter-checkbox-input"
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
        onClick={(e) => {
          handleClick("category");
          handlePreventClick(e);
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
                      className="all-events-filter-checkbox-input"
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
        onClick={(e) => {
          handleClick("price");
          handlePreventClick(e);
        }}
      >
        max price
        {priceClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input
              type="range"
              name="price-slider"
              className="all-events-filter-input all-events-filter-slider"
              min="0"
              max={Math.max(...allPrices.current)}
              onChange={(e) => {
                setIsFiltering(true);
                setPrice(Math.abs(e.target.value));
              }}
              value={price}
            />
            <label
              htmlFor="price-slider"
              className="all-events-filter-slider-label"
            >
              {price === 0 ? "free" : price + " €"}
            </label>
          </div>
        )}
      </span>
    </div>
  );
}
export default FilterAllEvents;
