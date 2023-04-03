import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "publications/";

function publicationUrl(id) {
    return `${apiEndpoint}${id}/`;
}

export function getPublications() {
    return http.get(apiEndpoint);
}

export function getPublication(publicationId) {
    return http.get(publicationUrl(publicationId));
}

export function createPublication(publication) {
    return http.post(apiEndpoint, publication);
}

export function updatePublication(publication) {
    return http.put(publicationUrl(publication.id), publication);
}

export function deletePublication(publicationId) {
    return http.delete(publicationUrl(publicationId));
}
