import React from "react";
import "./Footer.css";

export default function Footer() {
  const currYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="links">
        <div className="text">
          <h1>Contact Me</h1>
          <p className="link">
            <i className="bi bi-twitter"></i> Twitter
          </p>
          <br />
          <p className="link">
            <i className="bi bi-github"></i> Github
          </p>
          <br />
          <p className="link">
            <i className="bi bi-instagram"></i> Instagram
          </p>
          <br />
        </div>
      </div>
      <div className="copyright">
        <p>©️ Copyright Nart Aliti {currYear}</p>
      </div>
      <div className="main-text">
        <h1>
          You're not born a programmer, <br /> You become one
        </h1>
      </div>
    </div>
  );
}
