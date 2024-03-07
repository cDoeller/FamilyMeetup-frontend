import React from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar(props) {
  const { isLoggedIn, userName, setIsLoggedIn } = props;

  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-logo-wrapper">
        <Link to="/">
          <img src="/logo-font.png" alt="" className="nav-logo-image" />
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="user-name-logout-wrapper">
          <Link to="/admin" className="user-button-link">
            <div className="nav-user-user-name-wrapper">
              Logged in as{" "}
              <span className="nav-user-user-name-span">{userName}</span>
            </div>
          </Link>
          <div
            className="logout-button"
            onClick={() => {
              setIsLoggedIn(false);
              window.sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
              navigate(`/admin`);
            }}
          >
            <h1>X</h1>
          </div>
        </div>
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
