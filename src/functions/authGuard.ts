import { Store } from "react-notifications-component";
import requests from "../requests";

export default async function authGuard(userToken: any) {
  if (userToken) {
    const resData = await requests.userRequests.authUser(userToken);
    if (resData !== "Forbidden") {
      return resData.data;
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
    return "";
  }
}
