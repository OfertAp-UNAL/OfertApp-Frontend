import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "statistics/";

export function getStatistics(token) {
    return http.get(apiEndpoint, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

