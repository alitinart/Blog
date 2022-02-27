import notificationProvider from "./notificationProvider";
import requests from "./requests";

export default async function authGuard(userToken: any) {
  if (userToken) {
    const resData = await requests.userRequests.authUser(userToken);
    if (resData !== "Forbidden") {
      return resData.data;
    } else {
      notificationProvider(
        "Session Expired",
        "Session has Expired login again.",
        "danger"
      );
    }
  } else {
    return "";
  }
}
