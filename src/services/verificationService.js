import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl + "/api/v1/auth/verify-email/";

export function verify(token, userid) {
    return http.get(apiUrl + token + "/" + userid + "/");
}