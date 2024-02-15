import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="nav-logo-wrapper">
        <Link to="/">
          <img
            src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-5gqpkwih.png"
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
