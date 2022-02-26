import React from "react";
import Banner from "../../assets/images/Banner@2x.png";

import "./Main.css";

export default function Main() {
  return (
    <div className="main">
      <div className="banner">
        <img src={Banner} />
      </div>
      <div className="search-container">
        <input type={"text"} className="search" placeholder="Search for Post" />
        <i className="bi bi-search"></i>
      </div>
      <div className="divider"></div>
    </div>
  );
}
