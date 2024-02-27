import React from "react";
import "../styles/Header.css";

function HeaderAbout(props) {
  const {headlineAbout, subHeadlineAbout} = props;

  return (
    <div className="header-about-homepage-wrapper">
      <h1 className="header-about-title">
        {headlineAbout}
      </h1>
      <h3 className="header-about-subtitle">
        {subHeadlineAbout}
      </h3>
    </div>
  );
}

export default HeaderAbout;
