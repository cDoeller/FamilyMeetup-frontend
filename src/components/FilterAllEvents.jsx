import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/FilterAllEvents.css";

// ** TO DO **
// reset clicked when clicked on window
// multi aspect filtering
// lists with checkbox and apply
// url params

// const params = new URLSearchParams()
//   // console.log(params)
//   if(state)params.append('name',"Eduardo")
//   params.append("id_lte",'')
//   console.log(params.toString())
//   axios.get(`https://omar-class-api.adaptable.app/students?${params.toString()}`)
//   .then((res)=>{
//     console.log(res.data)
//   })
//   console.log(params)

function FilterAllEvents(props) {
  const { eventsToShow, setEventsToShow } = props;
  // console.log(eventsToShow);

  const [isFiltering, setIsFiltering] = useState(false);

  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState(0);
  const [price, setPrice] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const [locationClicked, setLocationClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [participantsClicked, setParticipantsClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);

  const allLocations = useRef(null);
  const allCategories = useRef(null);

  // * initial get request for all events
  // + list all categories and locations
  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setEventsToShow(response.data);
        console.log(response.data);
        return response.data;
      })
      .then((response) => {
        // make arrays for all locations and categories -once- (useRef)
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
        console.log("mounted");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // * filtering
  useEffect(() => {
    if (isFiltering) {
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      axios
        .get(`http://localhost:5005/events?${params.toString()}`)
        .then((response) => {
          setEventsToShow(response.data);
        })
        .then(() => {
          setIsFiltering(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, category, participants, price]);

  // * location filter
  useEffect(() => {
    if (isFiltering) {
      axios
        .get("http://localhost:5005/events")
        .then((response) => {
          setEventsToShow(response.data);
        })
        .then(() => {
          setIsFiltering(false);
          setShowAll(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showAll]);

  // // * location filter
  // useEffect(() => {
  //   if (isFiltering) {
  //     axios
  //       .get(`http://localhost:5005/events?location=${location}`)
  //       .then((response) => {
  //         setEventsToShow(response.data);
  //       })
  //       .then(() => {
  //         setIsFiltering(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [location]);

  // // * category filter
  // useEffect(() => {
  //   if (isFiltering) {
  //     axios
  //       .get(`http://localhost:5005/events?category=${category}`)
  //       .then((response) => {
  //         setEventsToShow(response.data);
  //       })
  //       .then(() => {
  //         setIsFiltering(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [category]);

  // // * participants filter
  // useEffect(() => {
  //   if (isFiltering) {
  //     axios
  //       .get(`http://localhost:5005/events?participants_lte=${participants}`)
  //       .then((response) => {
  //         setEventsToShow(response.data);
  //       })
  //       .then(() => {
  //         setIsFiltering(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [participants]);

  // // * price filter
  // useEffect(() => {
  //   if (isFiltering) {
  //     console.log(price);
  //     axios
  //       .get(`http://localhost:5005/events?price_lte=${price}`)
  //       .then((response) => {
  //         setEventsToShow(response.data);
  //       })
  //       .then(() => {
  //         setIsFiltering(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [price]);

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
    if (
      element === "participants" ||
      (element !== "participants" && participantsClicked)
    ) {
      setParticipantsClicked(!participantsClicked);
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

  // ************************* RETURN ************************** //
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
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <ul className="all-events-filter-location-ul">
              {allLocations &&
                allLocations.current.map((location) => {
                  return (
                    <li
                      key={location}
                      onClick={(e) => {
                        setIsFiltering(true);
                        setLocation(e.target.innerHTML.toLowerCase());
                        setLocationClicked(!locationClicked);
                      }}
                      className="all-events-filter-location-li"
                    >
                      {location}
                    </li>
                  );
                })}
            </ul>
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
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <ul className="all-events-filter-location-ul">
              {allCategories &&
                allCategories.current.map((category) => {
                  return (
                    <li
                      key={category}
                      onClick={(e) => {
                        setIsFiltering(true);
                        setCategory(e.target.innerHTML.toLowerCase());
                        setCategoryClicked(!categoryClicked);
                      }}
                      className="all-events-filter-location-li"
                    >
                      {category}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </span>
      {/* PARTICIPANTS FILTER */}
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
                setIsFiltering(true);
                setParticipants(Math.abs(e.target.value));
              }}
              value={participants}
            />
          </div>
        )}
      </span>
      {/* PRICE FILTER */}
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
                setIsFiltering(true);
                setPrice(Math.abs(e.target.value));
              }}
              value={price}
            />
          </div>
        )}
      </span>
    </div>
  );
}

export default FilterAllEvents;
