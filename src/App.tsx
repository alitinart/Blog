import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header/Header";
import Footer from "./pageComponents/Footer/Footer";
import Main from "./Components/Main/Main";
import Auth from "./Components/Auth/Auth";
import requests from "./requests";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    const authUser = async () => {
      if (localStorage.getItem("token")) {
        const resData = await requests.userRequests.authUser(
          localStorage.getItem("token")
        );
        if (resData !== "Forbidden") {
          setUser(resData.data);
        } else {
          Store.addNotification({
            title: "Session Expired",
            message: "Session has Expired login again",
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
      } else {
        setUser("");
      }
    };

    authUser();

    return () => {};
  }, []);

  const setUserHandler = (user: any) => {
    setUser(user);
  };

  return (
    <BrowserRouter>
      <div className="wrapper" style={{ marginBottom: "74px" }}>
        <Header
          userObject={user}
          setUserHandler={(user: any) => {
            setUserHandler(user);
          }}
        />
      </div>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/auth/:type" element={<Auth />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
