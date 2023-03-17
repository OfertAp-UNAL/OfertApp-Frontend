import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "/personas/";

function personUrl(id) {
  return `${apiEndpoint}${id}/`;
}

// localhost:8000/api/v1/personas/
export function getPeople() {
  return http.get(apiEndpoint);
}

// localhost:8000/api/v1/personas/:id
export function getPerson(personId) {
  return http.get(personUrl(personId));
}

export function createPerson(person) {
  return http.post(apiEndpoint, person);
}

export function updatePerson(person) {
  return http.put(personUrl(person.id), person);
}

export function addPersonHouse(person, houses) {
  const body = { houses: houses };
  return http.patch(personUrl(person.id), body);
}

export function deletePerson(personId) {
  return http.delete(personUrl(personId));
}
