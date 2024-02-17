import React, { useState } from "react";

function FilterAllEvents() {
  const [locationClicked, setLocationClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);

  const handleClick = (element) => {
    if(element==="location") setLocationClicked(!locationClicked);
    if(element==="category") setCategoryClicked(!categoryClicked);
  };

  const handlePreventClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="filter-all-events-wrapper">
      <p>show all</p>
      <p>date / time</p>
      <span onClick={()=>{handleClick("location")}}>
        location
        {locationClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input type="text" className="all-events-filter-input" />
            <button onClick={()=>{console.log("clicked")}} className="filter-apply-button">Apply</button>
          </div>
        )}
      </span>
      <span onClick={()=>{handleClick("category")}}>
        category
        {categoryClicked && (
          <div onClick={handlePreventClick} className="all-events-filter-popup">
            <input type="text" className="all-events-filter-input" />
            <button onClick={()=>{console.log("clicked")}} className="filter-apply-button">Apply</button>
          </div>
        )}
      </span>
      <p>max participants</p>
      <p>max price</p>
    </div>
  );
}

export default FilterAllEvents;
