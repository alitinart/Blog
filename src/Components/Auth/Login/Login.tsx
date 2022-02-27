import React from "react";
import { Store } from "react-notifications-component";
import { Link, useNavigate } from "react-router-dom";
import requests from "../../../functions/requests";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const nav = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    const resData = await requests.userRequests.loginUser(username, password);

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

    localStorage.setItem("token", resData.data.accessToken);
    localStorage.setItem("refreshId", resData.data.refreshTokenId);

    Store.addNotification({
      title: "Success",
      message: "Successfully Logged In",
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

    window.location.href = "/";
  };

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className="form"
      >
        {!loading ? (
          <div>
            <h1 className="title">Login</h1>
            <input
              type={"text"}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-control"
              placeholder="Username"
              required
            />
            <input
              type={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Password"
              required
            />
            <p className="redirect-link">
              Don't have a account ?{" "}
              <Link to={"/auth/register "} className="link">
                Register
              </Link>
            </p>
            <button type="submit" className="btn btn-white w-full">
              Submit
            </button>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </form>
    </div>
  );
}
