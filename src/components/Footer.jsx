import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-ironhack-container">
        <div className="footer-ironhack-logo-container">
          <a href="https://www.ironhack.com/">
            <img
              className="footer-ironhack-logo-image"
              src="https://schools.studentfinance.com/wp-content/uploads/2022/04/LogoBN300.png"
              alt=""
            />
          </a>
        </div>
        <div className="footer-project-by-part-of-wrapper">
          <h3 className="footer-project-by">
            A project by Natalia Pinto and Christian Doeller
          </h3>
          <h3 className="footer-project-by">As part of the IronHack Fullstack Bootcamp 2024</h3>
        </div>
      </div>
      <div className="footer-follow-container">
        <div className="footer-social-media-logos">
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.png"
                alt="x"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="https://starfinderfoundation.org/wp-content/uploads/2015/07/Facebook-logo-blue-circle-large-transparent-png.png"
                alt="fb"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                alt="insta"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
                alt="linked"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* <p className="footer-copyright">© Natalia Pinto & Christian Doeller</p> */}
        <ul>
          <a href="#">
            <li>FAQ</li>
          </a>
          <a href="#">
            <li>Data</li>
          </a>
          <a href="#">
            <li>Preferences</li>
          </a>
          <a href="#">
            <li>Cookies</li>
          </a>
          <a href="#">
            <li>Help</li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
