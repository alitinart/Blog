import requests from "./requests";

export default async function adminGuard(userToken: any) {
  if (userToken) {
    const resData = await requests.userRequests.adminCheck(userToken);
    if (resData !== "Forbidden" && !resData.error) {
      return resData;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
