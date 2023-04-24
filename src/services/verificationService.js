import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl + "auth/verify-email/";

export function verify(token, userid) {
  debugger;
  return http.get(apiUrl + token + "/" + userid + "/");
}
