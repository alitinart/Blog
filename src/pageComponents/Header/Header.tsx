import React from "react";
import { Link, useNavigate } from "react-router-dom";
import adminGuard from "../../functions/adminGuard";
import notificationProvider from "../../functions/notificationProvider";
import requests from "../../functions/requests";
import "./Header.css";

export default function Header(props: any) {
  const [showMenu, setShowMenu] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  const nav = useNavigate();

  React.useEffect(() => {
    const adminCheck = async () => {
      const resData = await adminGuard(localStorage.getItem("token"));
      if (!resData) {
        return setAdmin(false);
      }
      setAdmin(true);
    };
    adminCheck();

    return () => {};
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = async () => {
    const resData = await requests.userRequests.logoutUser(
      localStorage.getItem("token"),
      localStorage.getItem("refreshId")
    );

    if (resData.error) {
      return notificationProvider("Error", resData.message, "danger");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshId");

    notificationProvider("Logged Out", "You have been logged out.", "warning");

    props.setUserHandler("");
    nav("/auth/login");
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
            {admin ? <li className="nav-link">Add Post</li> : <></>}
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
        {admin ? <p className="menu-link">Add Post</p> : <></>}
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
