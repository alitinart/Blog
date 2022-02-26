import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="hamburger">
          <i className="bi bi-list" onClick={toggleMenu}></i>
        </div>
        <div className="links">
          <ul className="nav-links">
            <li className="nav-link">Home</li>
            <li className="nav-link">About</li>
            <li className="nav-link">Contact</li>
            <Link to={"/auth/register"} className="nav-link focused-link">
              Register
            </Link>
          </ul>
        </div>
        <div className="socials">
          <ul className="socials-links">
            <li className="social-link">
              <i className="bi bi-twitter" />
            </li>
            <li className="social-link">
              <i className="bi bi-github" />
            </li>
            <li className="social-link">
              {" "}
              <i className="bi bi-instagram" />
            </li>
          </ul>
        </div>
      </div>
      <div id="menu" className={showMenu ? "menu" : "menu--close"}>
        <p className="menu-link">Home</p>
        <p className="menu-link">About</p>
        <p className="menu-link">Contact</p>
        <Link to={"/auth/register"} className="menu-link focused-link">
          Register
        </Link>
      </div>
    </div>
  );
}
