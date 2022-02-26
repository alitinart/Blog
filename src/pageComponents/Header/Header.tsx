import React from "react";
import { Store } from "react-notifications-component";
import { Link } from "react-router-dom";
import requests from "../../requests";
import "./Header.css";

export default function Header(props: any) {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = async () => {
    const resData = await requests.userRequests.logoutUser(
      localStorage.getItem("token"),
      localStorage.getItem("refreshId")
    );

    if (resData.error) {
      return Store.addNotification({
        title: "Error",
        message: resData.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshId");

    Store.addNotification({
      title: "Logged Out",
      message: "You have been logged out.",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    props.setUserHandler("");
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
            {!props.userObject ? (
              <Link to={"/auth/register"} className="nav-link focused-link">
                Register
              </Link>
            ) : (
              <p onClick={logoutHandler} className="nav-link focused-link">
                Logout
              </p>
            )}
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
        {!props.userObject ? (
          <Link to={"/auth/register"} className="menu-link focused-link">
            Register
          </Link>
        ) : (
          <p onClick={logoutHandler} className="menu-link focused-link">
            Logout
          </p>
        )}
      </div>
    </div>
  );
}
