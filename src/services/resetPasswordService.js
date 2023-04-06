import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

export function resetPassword(token, user, newPassword) {
  return http.post(apiUrl + "auth/recover-password/", {
    token: token,
    user64_id: user,
    password: newPassword,
  });
}
