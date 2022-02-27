import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header/Header";
import Footer from "./pageComponents/Footer/Footer";
import Main from "./Components/Main/Main";
import Auth from "./Components/Auth/Auth";
import requests from "./functions/requests";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import authGuard from "./functions/authGuard";
import AddPost from "./Components/AddPost/AddPost";
import ViewPost from "./Components/ViewPost/ViewPost";

function App() {
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    const authUser = async () => {
      setUser(await authGuard(localStorage.getItem("token")));
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
        <Route path="/auth/:type" element={<Auth userObject={user} />}></Route>
        <Route path="/posts/:postId" element={<ViewPost />}></Route>
        <Route path="/addPost" element={<AddPost userObject={user} />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
