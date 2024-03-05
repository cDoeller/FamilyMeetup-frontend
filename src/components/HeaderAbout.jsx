import React from "react";
import "../styles/Header.css";

function HeaderAbout(props) {
  const { headlineAbout, subHeadlineAbout } = props;

  return (
    <div className="header-about-homepage-wrapper">
      {headlineAbout}
      {subHeadlineAbout}
    </div>
  );
}

export default HeaderAbout;
