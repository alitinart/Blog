import React from "react";
import { Store } from "react-notifications-component";
import { Link, useNavigate } from "react-router-dom";
import requests from "../../../functions/requests";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const nav = useNavigate();

  const loginHandler = async () => {
    setLoading(true);
    const resData = await requests.userRequests.registerUser(
      username,
      email,
      password,
      fullname
    );

    if (resData.error) {
      setLoading(false);
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

    Store.addNotification({
      title: "Success",
      message: resData.message,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    nav("/auth/login");
  };

  return (
    <div className="register">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler();
        }}
        className="form"
      >
        {!loading ? (
          <div>
            <h1 className="title">Register</h1>
            <input
              type={"text"}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-control"
              placeholder="Full Name"
              required
            />
            <input
              type={"text"}
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              className="form-control"
              placeholder="Username"
              required
            />
            <input
              type={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              type={"password"}
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
            <p className="redirect-link">
              Already have a account ?{" "}
              <Link to={"/auth/login"} className="link">
                Login
              </Link>
            </p>
            <button type="submit" className="btn btn-white w-full">
              Submit
            </button>{" "}
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </form>
    </div>
  );
}
