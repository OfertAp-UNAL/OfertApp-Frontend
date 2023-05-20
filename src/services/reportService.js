import http from "./httpService";
import config from "../config";

const apiUrl = config.apiUrl;

export function getReports() {
  const token = localStorage.getItem("token");
  return http.get(apiUrl + "reports/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getReportSupports(id) {
  const token = localStorage.getItem("token");
  return http.get(apiUrl + "reportsSupports/" + id + "/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function postReportSupport(formData, id) {
  const token = localStorage.getItem("token");
  return http.post(apiUrl + "reportsSupports/" + id + "/", formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}