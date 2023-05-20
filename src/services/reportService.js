import http from "./httpService";

export function getReports() {
  const token = localStorage.getItem("token");
  return http.get("http://localhost:8000/api/v1/reports/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
