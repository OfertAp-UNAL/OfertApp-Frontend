import http from "./httpService";
import config from "../config";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "notifications/";

export function getNotifications() {
    const token = localStorage.getItem("token");
    return http.get(apiEndpoint, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}