import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { isLoggedIn, userName } = props;

  return (
    <nav>
      <div className="nav-logo-wrapper">
        <Link to="/">
          <img src="/logo-font.png" alt="" className="nav-logo-image" />
        </Link>
      </div>

      {isLoggedIn ? (
        <Link to="/admin" className="user-button-link">
          <div className="nav-user-user-name-wrapper">
            Logged in as{" "}
            <span className="nav-user-user-name-span">{userName}</span>
          </div>
        </Link>
      ) : (
        <div className="nav-user-wrapper">
          <Link to="/admin" className="user-button-link">
            <button className="nav-user-button">register</button>
          </Link>
          <Link to="/admin" className="user-button-link">
            <button className="nav-user-button">sign in</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
