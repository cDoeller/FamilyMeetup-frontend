import React from "react";
import "../NavBar.css"

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="nav-logo-wrapper">
        <Link to="/">
          <img
            src="/logo.png"
            alt=""
            className="nav-logo-image"
          />
        </Link>
      </div>
      <div className="nav-user-wrapper">
        <Link to="#">
          <button className="nav-user-button">register</button>
        </Link>
        <Link to="#">
          <button className="nav-user-button">sign in</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
