import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

import "./Auth.css";
import authGuard from "../../functions/authGuard";

export default function Auth(props: any) {
  const { type } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const auth = async () => {
      if (await authGuard(localStorage.getItem("token"))) {
        nav("/");
      }
    };

    auth();
    return () => {};
  }, []);

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
