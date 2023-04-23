import http from "./httpService";
import config from "../config.json";
import { debug } from "util";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "publications/";

function publicationUrl(id) {
  return `${apiEndpoint}${id}/`;
}

export function getPublications(params) {
  return http.get(apiEndpoint, { params });
}

export function getPublication(publicationId, token) {
  const headers = token ? {
    "Authorization": "Bearer " + token
  } : {};
  return http.get(
    publicationUrl(publicationId),
    { headers }
  );
}

export function createPublication(publication) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  Object.entries(publication).forEach(([key, value]) =>
    formData.append(key, value)
  );
  debugger;

  return http.post(apiEndpoint, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updatePublication(publication) {
  return http.put(publicationUrl(publication.id), publication);
}

export function deletePublication(publicationId) {
  return http.delete(publicationUrl(publicationId));
}
