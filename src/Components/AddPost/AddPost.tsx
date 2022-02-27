import * as React from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import adminGuard from "../../functions/adminGuard";
import notificationProvider from "../../functions/notificationProvider";

export default function AddPost(props: any) {
  const nav = useNavigate();

  React.useEffect(() => {
    const adminCheck = async () => {
      const resData = await adminGuard(localStorage.getItem("token"));
      if (!resData) {
        notificationProvider(
          "Not Admin",
          "You cannot access this part of the site.",
          "danger"
        );
        nav("/");
      }
    };
    adminCheck();
    return () => {};
  }, []);

  return <div className="add-post"></div>;
}
