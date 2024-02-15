import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div>
        <Link to="/">
          <img
            src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-5gqpkwih.png"
            alt=""
            width="50px"
          />
        </Link>
      </div>
      <div>
        <Link to="#">
          <button>sign up</button>
        </Link>
        <Link to="#">
          <button>log in</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
