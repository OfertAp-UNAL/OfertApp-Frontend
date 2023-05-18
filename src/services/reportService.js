import http from "./httpService";

export function getReports() {
  return http.get("localhost:3001/reports");
}
