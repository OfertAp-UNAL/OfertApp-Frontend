import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "auth/login/";

// localhost:8000/api/v1/auth/login/
export function login(user) {
  return http.post(apiEndpoint, user);
}