// This service will help us with retreiving some configuration data from the server
// i.e. PayPal's client ID

import http from "./httpService";
import config from "../config";

const requestURL = config.apiUrl;

export function preparePayment(amount) {
    const token = localStorage.getItem("token");
    return http.post(requestURL + "payments2/prepare/", { amount },
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}
export function performPayment(data) {
    const token = localStorage.getItem("token");
    return http.post(requestURL + "payments/", data,
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}