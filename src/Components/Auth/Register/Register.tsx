import React from "react";
import { Link, useNavigate } from "react-router-dom";
import requests from "../../../requests";

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
      return alert(resData.message);
    }

    alert(resData.message);

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
            />
            <input
              type={"text"}
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              className="form-control"
              placeholder="Username"
            />
            <input
              type={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Email"
            />
            <input
              type={"password"}
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password "
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
