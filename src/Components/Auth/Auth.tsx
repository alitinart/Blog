import React from "react";
import { useParams } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

import "./Auth.css";

export default function Auth() {
  const { type } = useParams();

  return (
    <div className="auth">
      {type === "register" ? (
        <Register />
      ) : type === "login" ? (
        <Login />
      ) : (
        <div className="404"></div>
      )}
    </div>
  );
}
