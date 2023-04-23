import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "transactions/";

export function getTransactions(token) {
    return http.get(apiEndpoint, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

