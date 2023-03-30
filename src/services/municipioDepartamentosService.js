import http from "./httpService";

export function getDepartments() {
  return http.get(
    "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento"
  );
}
